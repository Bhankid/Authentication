import { Clerk } from "@clerk/clerk-js";

function removeDevelopmentBadge() {
  const removeAttempts = 10;
  let attemptCount = 0;

  const removeBadge = () => {
    const badges = document.querySelectorAll('[class*="cl-development-badge"]');
    badges.forEach((badge) => badge.remove());

    attemptCount++;
    if (attemptCount < removeAttempts) {
      setTimeout(removeBadge, 100);
    }
  };

  removeBadge();
}

export async function initializeClerk() {
  const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  const clerk = new Clerk(clerkPubKey);
  await clerk.load();

  if (clerk.user) {
    document.getElementById("app").innerHTML = `
      <div id="user-button"></div>
    `;

    const userButtonDiv = document.getElementById("user-button");
    clerk.mountUserButton(userButtonDiv);
  } else {
    document.getElementById("app").innerHTML = `
      <div id="sign-in"></div>
    `;

    const signInDiv = document.getElementById("sign-in");
    clerk.mountSignIn(signInDiv);
  }

  // Call the function to remove the development badge
  removeDevelopmentBadge();
}
