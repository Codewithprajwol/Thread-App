export function timeAgo(dateString) {
  const date = new Date(dateString); // Convert the string to a Date object
  const now = new Date();
  
  // Get the difference in seconds
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  // Get the difference in minutes, hours, and days
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  // Return the time difference in an appropriate format
  if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds > 0) {
    return `${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''} ago`;
  } else {
    return "Just now"; // For when the time difference is almost 0
  }
}

