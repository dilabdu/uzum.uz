const currentLocation = document.querySelector(".current-location");

document.addEventListener("DOMContentLoaded", () => {
  if (!navigator.geolocation) {
    alert("Brauzeringiz geolocation-ni qo‘llab-quvvatlamaydi ❌");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        // Reverse geocoding (OpenStreetMap - Nominatim)
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=en`
        );
        const data = await res.json();

        const city =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          "Shahar aniqlanmadi";

        const country = data.address.country;

        currentLocation.textContent = `${city}, ${country}`;
      } catch (error) {
        currentLocation.textContent = "Manzilni aniqlashda xatolik ❌";
      }
    },
    () => {
      currentLocation.textContent = "Joylashuvga ruxsat berilmadi ❌";
    }
  );
});
