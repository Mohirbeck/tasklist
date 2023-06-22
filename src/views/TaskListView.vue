<template>
  <div>
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-between items-center py-2">
        <div class="w-1 h-1"></div>
        <div class="text-lg font-bold">Task list</div>
        <button
          type="button"
          @click="openAddDialog"
          class="flex items-center focus:outline-none rounded-lg text-gray-600 hover:text-yellow-600 focus:text-yellow-600 font-semibold p-2 border border-transparent hover:border-yellow-300 focus:border-yellow-300 transition"
        >
          <span class="text-sm">Add task</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="inline-flex items-center justify-center w-6 h-6 text-gray-600 text-xs rounded bg-white transition ml-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
      <ul
        role="list"
        class="divide-y divide-gray-200 bg-white rounded-3xl p-8 mb-5"
      >
        <li
          class="flex items-center justify-between gap-x-6 py-5"
          v-for="task in reversedTasks"
          :key="task.id"
        >
          <div class="min-w-0">
            <div class="flex items-start gap-x-3">
              <p class="text-sm font-semibold leading-6 text-gray-900">
                {{ task.title }}
              </p>
              <button
                class="rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                :class="
                  task.status === 1
                    ? 'text-green-700 bg-green-50 ring-green-600/20'
                    : task.status === 2
                    ? 'text-gray-600 bg-gray-50 ring-gray-500/10'
                    : 'text-yellow-800 bg-yellow-50 ring-yellow-600/20'
                "
                @click="ChangeStatus(task)"
              >
                {{
                  task.status === 1
                    ? "Completed"
                    : task.status === 2
                    ? "In progress"
                    : "Archived"
                }}
              </button>
              <button
                class="rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                v-if="show_undo === task.id"
                @click="Undo(task)"
              >
                Undo
                {{ undo_counter }}
              </button>
            </div>
            <div
              class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500"
            >
              <p class="whitespace-nowrap">
                Due on
                <time datetime="2023-03-17T00:00Z">{{
                  task.end_date | dateFormatter
                }}</time>
              </p>
              <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
                <circle cx="1" cy="1" r="1" />
              </svg>
              <p class="whitespace-nowrap">
                Started
                <time datetime="2023-03-17T00:00Z">{{
                  task.start_date | dateFormatter
                }}</time>
              </p>
            </div>
          </div>
          <div class="flex flex-none items-center gap-x-4">
            <div class="relative flex-none">
              <button
                type="button"
                class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900 menu-button"
                @click="open = task.id"
              >
                <svg
                  class="h-5 w-5 menu-button"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    class="menu-button"
                    d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"
                  />
                </svg>
              </button>

              <!--
          Dropdown menu, show/hide based on menu state.

          Entering: "transition ease-out duration-100"
            From: "transform opacity-0 scale-95"
            To: "transform opacity-100 scale-100"
          Leaving: "transition ease-in duration-75"
            From: "transform opacity-100 scale-100"
            To: "transform opacity-0 scale-95"
        -->
              <div
                class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu-0-button"
                tabindex="-1"
                v-show="open === task.id"
                v-click-outside="(e) => (open = -1)"
              >
                <!-- Active: "bg-gray-50", Not Active: "" -->
                <button
                  class="block px-3 py-1 text-sm leading-6 text-gray-900 w-full"
                  role="menuitem"
                  @click="openEditDialog(task)"
                >
                  Edit
                </button>
                <button
                  class="block px-3 py-1 text-sm leading-6 text-red-500 w-full"
                  role="menuitem"
                  @click="deleteTask(task)"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      v-show="dialog"
    >
      <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      ></div>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          @click.self="closeEditDialog"
        >
          <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
          <div
            class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
          >
            <div class="relative">
              <label
                for="title"
                class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                >Title</label
              >
              <input
                type="text"
                name="title"
                id="title"
                class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                placeholder="My task"
                v-model="task.title"
              />
            </div>
            <div class="flex space-x-4 w-full mt-8">
              <div class="relative w-full">
                <label
                  for="start_date"
                  class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                  >Start date</label
                >
                <input
                  type="date"
                  name="start_date"
                  id="start_date"
                  class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                  v-model="task.start_date"
                />
              </div>
              <div class="relative w-full">
                <label
                  for="end_date"
                  class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                  >End date</label
                >
                <input
                  type="date"
                  name="end_date"
                  id="end_date"
                  class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                  v-model="task.end_date"
                />
              </div>
            </div>
            <div
              class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"
            >
              <button
                type="button"
                @click="saveTask"
                class="inline-flex w-full justify-center rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 sm:col-start-2"
              >
                Save
              </button>
              <button
                type="button"
                @click="closeEditDialog"
                class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskListView",
  data() {
    return {
      open: -1,
      show_undo: 0,
      undo_counter: 5,
      dialog: false,
      task: {
        title: "",
        start_date: "",
        end_date: "",
      },
    };
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },
    reversedTasks() {
      return this.tasks.slice().reverse();
    },
  },
  methods: {
    openEditDialog(task) {
      this.task = task;
      this.dialog = true;
    },
    openAddDialog() {
      this.open = -1;
      this.dialog = true;
    },
    closeEditDialog() {
      this.task = {
        title: "",
        start_date: "",
        end_date: "",
      };
      this.dialog = false;
    },
    ChangeStatus(task) {
      if (task.status !== 3) {
        this.show_undo = 0;
        this.$store.dispatch("changeStatus", task);
        this.show_undo = task.id;
        this.undo_counter = 5;
        setInterval(() => {
          if (this.show_undo === task.id) {
            this.undo_counter--;
          }
        }, 1000);
        setTimeout(() => {
          if (this.show_undo === task.id) {
            this.show_undo = 0;
          }
        }, 5000);
      }
    },
    Undo(task) {
      this.$store.dispatch("revertStatus", task);
      this.show_undo = 0;
    },
    saveTask() {
      if (this.open === -1) {
        this.task.id = this.tasks[this.tasks.length - 1].id + 1;
        this.task.status = 2;
        this.$store.dispatch("addTask", this.task);
        this.closeEditDialog();
      } else {
        this.$store.dispatch("editTask", this.task);
      }
    },
    deleteTask(task) {
      this.$store.dispatch("deleteTask", task);
    },
  },
  filters: {
    dateFormatter(value) {
      return new Date(value).toLocaleDateString();
    },
  },
};
</script>
