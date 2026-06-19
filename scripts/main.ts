// --- 1. Global State ---
let currentIndex = 0;
let modalIndex = 0;
let currentScale = 1;
let activeFilter: 'all' | 'logical' | 'physical' = 'all'; // Add this!

// --- 2. Data Definition ---
const projects = [
    { 
        title: "PetSync", 
        purpose: "A central mobile hub for tracking pet health metrics...",
        className: "", 
        images: ["assets/PETSYNC/petsync3.png", "assets/PETSYNC/petsync2.png", "assets/PETSYNC/petsync1.png"] 
    },
    { 
        title: "Networks - Festivity Junction Tender", 
        purpose: "Acted as a contractor to design, deploy, and manage a temporary computer network...",
        className: "networks-layout", 
        images: ["assets/NETWORKS/s1_physical.png", "assets/NETWORKS/full_logical.png", "assets/NETWORKS/full_physical.png"] 
    }
];

function updateModalDisplay(container: HTMLElement) {
    // Convert NodeList to Array to enable .filter()
    const images = Array.from(container.querySelectorAll('img'));
    const keyOverlay = document.getElementById('modal-key-overlay') as HTMLImageElement;

    // Filter images based on current activeFilter state
    const filteredImages = images.filter(img => {
        if (activeFilter === 'all') return true;
        return img.src.includes(activeFilter);
    });

    // Hide all images initially
    images.forEach(img => img.style.display = 'none');

    // Show the active image in the filtered list
    if (filteredImages[modalIndex]) {
        const activeImg = filteredImages[modalIndex] as HTMLImageElement;
        activeImg.style.display = 'block';
        activeImg.style.transform = `scale(${currentScale})`;

        // Key overlay only shows if the active image is a "physical" design
        if (activeImg.src.includes("physical")) {
            keyOverlay.style.display = 'block';
        } else {
            keyOverlay.style.display = 'none';
        }
    }
}


// --- 4. Main Project Switcher ---
export function switchProject(direction: number): void {
    currentIndex = (currentIndex + direction + projects.length) % projects.length;
    const project = projects[currentIndex];
    if (!project) return;

    const card = document.querySelector('.project-card') as HTMLElement;
    if (!card) return;

    card.className = `project-card ${project.className}`;
    card.classList.remove('slide-in');
    void card.offsetWidth; 
    card.classList.add('slide-in');

    const titleElement = card.querySelector('h3');
    if (titleElement) titleElement.textContent = project.title;

    const firstListItem = card.querySelector('.project-details ul li');
    if (firstListItem) firstListItem.innerHTML = `<strong>Purpose:</strong> ${project.purpose}`;

    // Update Project Images
    const images = card.querySelectorAll('.image-stack img');
    images.forEach(img => (img as HTMLImageElement).style.display = 'none');
    project.images.forEach((src, index) => {
        if (images[index]) {
            const element = images[index] as HTMLImageElement;
            element.src = src;
            element.style.display = 'block';
        }
    });

    // Gallery Link Setup
    let galleryLink = card.querySelector('.gallery-link') as HTMLAnchorElement;
    if (!galleryLink) {
        galleryLink = document.createElement('a');
        galleryLink.className = "gallery-link";
        galleryLink.href = "#";
        galleryLink.textContent = "Click to view images";
        card.querySelector('.project-details')?.appendChild(galleryLink);
    }

    galleryLink.onclick = (e) => {
        e.preventDefault();
        const modal = document.getElementById('imageModal') as HTMLElement;
        const container = document.getElementById('modal-container') as HTMLElement;
        const keyOverlay = document.getElementById('modal-key-overlay') as HTMLImageElement;

        container.innerHTML = ''; 
        currentScale = 1;
        modalIndex = 0;
        activeFilter = 'all';

        if (project.title.includes("Networks")) {
        keyOverlay.style.display = 'block';
        } else {
        keyOverlay.style.display = 'none';
        }

        project.images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            container.appendChild(img);
        });

        const networkFilters = document.getElementById('network-filters') as HTMLElement;
        networkFilters.style.display = project.title.includes("Networks") ? 'flex' : 'none';

        updateModalDisplay(container);
        modal.style.display = 'flex';
    };

    // Ensure it hides when closing
    document.querySelector('.close-modal')?.addEventListener('click', () => {
        document.getElementById('imageModal')!.style.display = 'none';
        document.getElementById('modal-key-overlay')!.style.display = 'none';
    });
}

// --- 5. Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Carousel Nav
    document.getElementById('prevBtn')?.addEventListener('click', () => switchProject(-1));
    document.getElementById('nextBtn')?.addEventListener('click', () => switchProject(1));

    // Modal Global Controls
    document.querySelector('.close-modal')?.addEventListener('click', () => {
        document.getElementById('imageModal')!.style.display = 'none';
    });

    const modalContainer = document.getElementById('modal-container') as HTMLElement;
    
    document.getElementById('zoomIn')!.onclick = () => {
        currentScale += 0.2;
        updateModalDisplay(modalContainer);
    };
    document.getElementById('zoomOut')!.onclick = () => {
        if (currentScale > 0.4) currentScale -= 0.2;
        updateModalDisplay(modalContainer);
    };
    // Navigation Listeners (Place these inside your DOMContentLoaded block)
document.getElementById('modalNext')!.onclick = () => {
    const images = modalContainer.querySelectorAll('img');
    // Ensure we don't go past the last image
    if (modalIndex < images.length - 1) { 
        modalIndex++; 
        updateModalDisplay(modalContainer); 
    }
};

document.getElementById('modalPrev')!.onclick = () => {
    // Ensure we don't go below the first image
    if (modalIndex > 0) { 
        modalIndex--; 
        updateModalDisplay(modalContainer); 
    }
};
const logicalBtn = document.getElementById('showLogical');
    const physicalBtn = document.getElementById('showPhysical');

    if (logicalBtn && physicalBtn) {
        // Use ! to tell TypeScript "this element definitely exists"
logicalBtn.onclick = () => {
    activeFilter = 'logical';
    modalIndex = 0;
    updateModalDisplay(document.getElementById('modal-container')!);
};

physicalBtn.onclick = () => {
    activeFilter = 'physical';
    modalIndex = 0;
    updateModalDisplay(document.getElementById('modal-container')!);
};
    }
});
