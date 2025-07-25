const LoadingSpinner = () => {
  return (
    <div class="flex min-h-screen -translate-y-10 flex-col items-center justify-center space-y-4">
      <div class="h-20 w-20 animate-spin rounded-full border-4 border-transparent border-l-green-400"></div>
      <p class="text-lg font-medium text-gray-600">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
