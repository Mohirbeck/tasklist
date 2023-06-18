<template>
  <aside class="fixed inset-y-0 left-0 bg-white shadow-md max-h-screen w-60">
    <div class="flex flex-col justify-between h-full">
      <div class="flex-grow">
        <div class="px-4 py-6 text-center border-b">
          <h1 class="text-xl font-bold leading-none">
            <span class="text-yellow-700">Task Manager</span> App
          </h1>
        </div>
        <div class="p-4">
          <ul class="space-y-1">
            <li>
              <router-link
                to="/"
                class="flex items-center rounded-xl font-bold text-sm py-3 px-4"
                :class="$route.path === '/' ? 'bg-yellow-200 text-yellow-900' : 'text-gray-600 hover:bg-yellow-50'"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  class="text-lg mr-4"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"
                  /></svg
                >Dashboard
              </router-link>
            </li>
            <li>
              <router-link
                to="/tasklist"
                class="flex rounded-xl font-bold text-sm py-3 px-4"
                :class="$route.path === '/tasklist' ? 'bg-yellow-200 text-yellow-900' : 'text-gray-600 hover:bg-yellow-50'"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  class="text-lg mr-4"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1z"
                  /></svg
                >Task list
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: "SidebarComponent",
};
</script>

<style></style>
