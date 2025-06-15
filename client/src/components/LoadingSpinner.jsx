const LoadingSpinner = () => {
  return (
    <div class="flex flex-col items-center justify-center min-h-screen space-y-4 -translate-y-10">
      <div class="animate-spin rounded-full h-20 w-20 border-4 border-transparent border-l-green-400"></div>
      <p class="text-gray-600 text-lg font-medium">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
