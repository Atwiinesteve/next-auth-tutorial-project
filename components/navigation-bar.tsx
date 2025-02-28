// "use client";

import FetchedUserDetails from "./fetchedUserDetails";

export default function NavigationBar() {
  return (
    <div>
      <nav className="border-b">
        <FetchedUserDetails />
      </nav>
    </div>
  );
}
