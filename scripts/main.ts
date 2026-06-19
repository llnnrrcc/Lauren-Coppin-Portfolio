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

export function switchProject(direction: number): void {
    currentIndex = (currentIndex + direction + projects.length) % projects.length;
    const project = projects[currentIndex];
    if (!project) return;

    const card = document.querySelector('.project-card') as HTMLElement;
    if (!card) return;

    card.className = `project-card ${project.className}`;

    // Trigger animation
    card.classList.remove('slide-in');
    void card.offsetWidth; 
    card.classList.add('slide-in');

    // Update Title
    const titleElement = card.querySelector('h3');
    if (titleElement) titleElement.textContent = project.title;

    // Update Purpose
    const firstListItem = card.querySelector('.project-details ul li');
    if (firstListItem) firstListItem.innerHTML = `<strong>Purpose:</strong> ${project.purpose}`;

    // Ensure the Gallery Link exists and is updated
    const detailsContainer = card.querySelector('.project-details') as HTMLElement;
    let galleryLink = card.querySelector('.gallery-link') as HTMLAnchorElement;
    
    if (!galleryLink) {
        galleryLink = document.createElement('a');
        galleryLink.className = "gallery-link";
        galleryLink.href = "#";
        galleryLink.textContent = "Click to view images";
        detailsContainer.appendChild(galleryLink);
    }

    galleryLink.onclick = (e) => {
        e.preventDefault();
        const modal = document.getElementById('imageModal') as HTMLElement;
        const container = document.getElementById('modal-container') as HTMLElement;
        container.innerHTML = ''; 
        project.images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            container.appendChild(img);
        });
        modal.style.display = 'flex';
    };

    // Update Images
    const images = card.querySelectorAll('.image-stack img');
    images.forEach((img, index) => {
        const element = img as HTMLImageElement;
        const newSrc = project.images[index];
        if (newSrc) {
            element.src = newSrc;
            element.style.display = 'block';
        } else {
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
    } else {
        console.error("Buttons not found! Check your IDs in projects.html");
    }
});
