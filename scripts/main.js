// Define your project data
const projects = [
    {
        title: "PetSync",
        purpose: "A central mobile hub for tracking pet health metrics...",
        className: "", // Empty string means no extra layout changes
        images: ["assets/PETSYNC/petsync3.png", "assets/PETSYNC/petsync2.png", "assets/PETSYNC/petsync1.png"]
    },
    {
        title: "Networks - Festivity Junction Tender",
        purpose: "Acted as a contractor to design, deploy, and manage a temporary computer network...",
        className: "networks-layout", // This specific class triggers the vertical CSS
        images: ["assets/NETWORKS/s1_physical.png", "assets/NETWORKS/full_logical.png", "assets/NETWORKS/full_physical.png"]
    }
];
let currentIndex = 0;
export function switchProject(direction) {
    currentIndex = (currentIndex + direction + projects.length) % projects.length;
    const project = projects[currentIndex];
    if (!project)
        return;
    const card = document.querySelector('.project-card');
    if (!card)
        return;
    card.className = `project-card ${project.className}`;
    // Trigger animation
    card.classList.remove('slide-in');
    void card.offsetWidth;
    card.classList.add('slide-in');
    // Update Title
    const titleElement = card.querySelector('h3');
    if (titleElement) {
        titleElement.textContent = project.title;
    }
    // Update Purpose
    const firstListItem = card.querySelector('.project-details ul li');
    if (firstListItem) {
        firstListItem.innerHTML = `<strong>Purpose:</strong> ${project.purpose}`;
    }
    // ADD THIS: Define 'images' so the forEach loop knows what to iterate over
    const images = card.querySelectorAll('.image-stack img');
    images.forEach((img, index) => {
        const element = img;
        const newSrc = project.images[index];
        console.log("Attempting to load:", newSrc);
        if (newSrc) {
            element.src = newSrc;
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    console.log("Prev Button found:", prevBtn);
    console.log("Next Button found:", nextBtn);
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => switchProject(-1));
        nextBtn.addEventListener('click', () => switchProject(1));
    }
    else {
        console.error("Buttons not found! Check your IDs in projects.html");
    }
});
//# sourceMappingURL=main.js.map