<template>
  <div class="h-screen">
    <header class="bg-yellow-50 py-3 px-4 h-16">
      <div class="max-w-4xl mx-auto">
        <div class="text-lg font-bold text-center">Today's Plan</div>
      </div>
    </header>
    <div class="relative overflow-hidden">
      <div class="px-6 py-8">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white rounded-3xl p-8 mb-5">
            <h1 class="text-3xl font-bold mb-10">Welcome back, John Doe</h1>

            <hr class="my-10" />

            <div class="grid grid-cols-2 gap-x-20">
              <div>
                <h2 class="text-2xl font-bold mb-4">Stats</h2>

                <div class="grid grid-cols-2 gap-4">
                  <div class="col-span-2">
                    <div class="p-4 bg-green-100 rounded-xl">
                      <div class="font-bold text-xl text-gray-800 leading-none">
                        Good day, <br />John
                      </div>
                      <div class="mt-5">
                        <button
                          type="button"
                          class="inline-flex items-center justify-center py-2 px-3 rounded-xl bg-white text-gray-800 hover:text-green-500 text-sm font-semibold transition"
                        >
                          Start tracking
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="p-4 bg-yellow-100 rounded-xl text-gray-800">
                    <div class="font-bold text-2xl leading-none">
                      {{ finished_tasks }}
                    </div>
                    <div class="mt-2">Tasks finished</div>
                  </div>
                  <div class="p-4 bg-yellow-100 rounded-xl text-gray-800">
                    <div class="font-bold text-2xl leading-none">5,5</div>
                    <div class="mt-2">Tracked hours</div>
                  </div>
                  <div class="col-span-2">
                    <div class="p-4 bg-purple-100 rounded-xl text-gray-800">
                      <div class="font-bold text-xl leading-none">
                        Your daily plan
                      </div>
                      <div class="mt-2">5 of 8 completed</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="flex justify-between items-center mb-4">
                  <div class="h-1 w-1"></div>
                  <h2 class="text-2xl font-bold">Your tasks today</h2>
                  <router-link to="/tasklist" class="text-yellow-600 underline hover:text-yellow-700 transition">
                    View tasks
                  </router-link>
                </div>
                

                <div class="space-y-4">
                  <div
                    class="p-4 bg-white border rounded-xl text-gray-800 space-y-2"
                    v-for="task in todays_tasks"
                    :key="task.id"
                  >
                    <div class="flex justify-between">
                      <div class="text-gray-400 text-xs">{{ task.id }}</div>
                      <div class="text-gray-400 text-xs">
                        {{ task.start_date | dateFormatter }}
                      </div>
                    </div>
                    <span class="font-bold">{{ task.title }}</span>
                    <div class="text-sm text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        class="text-gray-800 inline align-middle mr-1"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                        />
                      </svg>
                      Deadline is today
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  computed: {
    finished_tasks() {
      return this.$store.getters.finished_tasks;
    },
    todays_tasks() {
      return this.$store.getters.todays_tasks;
    },
  },
  filters: {
    dateFormatter(value) {
      return new Date(value).toLocaleDateString();
    },
  },
};
</script>
