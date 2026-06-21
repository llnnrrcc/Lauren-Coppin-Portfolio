// --- 1. Global State ---
let currentIndex = 0;
let modalIndex = 0;
let currentScale = 1;
let activeFilter = 'all'; // Add this!
const projects = [
    {
        title: "PetSync",
        purpose: "A central mobile hub for tracking pet health metrics, managing vet appointments, and scheduling care with shared responsibility.",
        className: "",
        images: ["assets/PETSYNC/petsync3.png", "assets/PETSYNC/petsync2.png", "assets/PETSYNC/petsync1.png"],
        details: [
            { label: "User-Driven Design", content: "Identified three distinct owner monitoring styles—Intuition-based, Mental record keepers, and Data-driven—to ensure the app catered to both simple logging and advanced analytics." },
            { label: "Tech Stack", content: "Built on a microservices-inspired architecture using Flutter/Dart for cross-platform UI, and Python/FastAPI with PostgreSQL for robust backend operations." },
            { label: "Key Features", content: "Implemented species-specific intelligence to filter irrelevant metrics, automated threshold checks for early health risk detection, and offline caching for reliable data access." },
            { label: "Performance & Reliability", content: "Optimized for a 2-second dashboard load time (NF2) and ensured system resilience through an Event Broker for asynchronous tasks." },
            { label: "Resources", content: ["GitHub Repository: https://github.com/lula1450/SETAP-B.git", "Documentation: https://tutorial1-team7b.readthedocs.io/en/latest/"] }
        ]
    },
    {
        title: "Networks - Festivity Junction Tender",
        purpose: "Acted as a contractor to design, deploy, and manage a temporary computer network to ensure reliable connectivity for a large-scale event.",
        className: "networks-layout",
        images: ["assets/NETWORKS/s1_physical.png", "assets/NETWORKS/full_logical.png", "assets/NETWORKS/full_physical.png"],
        details: [
            { label: "Project Scope", content: "Designed and implemented a high-capacity temporary network for a large-scale public event, supporting over 500 concurrent connections." },
            { label: "Architecture", content: "Developed a tiered design using both logical VLAN segmentation to isolate traffic and physical cabling infrastructure for site-wide connectivity." },
            { label: "Tech Stack", content: "Configured Cisco switches and firewalls to manage traffic; utilized Nmap and Wireshark for continuous performance monitoring and security auditing." },
            { label: "Problem Solving", content: "Mitigated potential signal interference in high-traffic areas by optimizing wireless access point (WAP) placement and frequency selection." },
            { label: "Resilience", content: "Implemented redundant backhaul connections to ensure 99.9% uptime during peak event hours." },
            { label: "Resources", content: ["GitHub Repository", "Technical Design Document"] }
        ]
    }
];
function updateModalDisplay(container) {
    // Convert NodeList to Array to enable .filter()
    const images = Array.from(container.querySelectorAll('img'));
    const keyOverlay = document.getElementById('modal-key-overlay');
    // Filter images based on current activeFilter state
    const filteredImages = images.filter(img => {
        if (activeFilter === 'all')
            return true;
        return img.src.includes(activeFilter);
    });
    // Hide all images initially
    images.forEach(img => img.style.display = 'none');
    // Show the active image in the filtered list
    if (filteredImages[modalIndex]) {
        const activeImg = filteredImages[modalIndex];
        activeImg.style.display = 'block';
        activeImg.style.transform = `scale(${currentScale})`;
        // Key overlay only shows if the active image is a "physical" design
        if (activeImg.src.includes("physical")) {
            keyOverlay.style.display = 'block';
        }
        else {
            keyOverlay.style.display = 'none';
        }
    }
}
// --- 4. Main Project Switcher ---
export function switchProject(direction) {
    currentIndex = (currentIndex + direction + projects.length) % projects.length;
    const project = projects[currentIndex];
    if (!project)
        return;
    const card = document.querySelector('.project-card');
    if (!card)
        return;
    card.className = `project-card ${project.className}`;
    card.classList.remove('slide-in');
    void card.offsetWidth;
    card.classList.add('slide-in');
    const titleElement = card.querySelector('h3');
    if (titleElement)
        titleElement.textContent = project.title;
    // Dynamically build the details list
    const detailsList = card.querySelector('.project-details ul');
    if (detailsList) {
        detailsList.innerHTML = '';
        // Add Purpose
        const purposeItem = document.createElement('li');
        purposeItem.innerHTML = `<strong>Purpose:</strong> ${project.purpose}`;
        detailsList.appendChild(purposeItem);
        // Add all other details
        if (project.details) {
            project.details.forEach(detail => {
                const item = document.createElement('li');
                if (Array.isArray(detail.content)) {
                    // Handle array content (like Resources)
                    item.innerHTML = `<strong>${detail.label}:</strong> ${detail.content.join(' | ')}`;
                }
                else {
                    item.innerHTML = `<strong>${detail.label}:</strong> ${detail.content}`;
                }
                detailsList.appendChild(item);
            });
        }
    }
    // Update Project Images
    const images = card.querySelectorAll('.image-stack img');
    images.forEach(img => img.style.display = 'none');
    project.images.forEach((src, index) => {
        if (images[index]) {
            const element = images[index];
            element.src = src;
            element.style.display = 'block';
        }
    });
    // Gallery Link Setup
    let galleryLink = card.querySelector('.gallery-link');
    if (!galleryLink) {
        galleryLink = document.createElement('a');
        galleryLink.className = "gallery-link";
        galleryLink.href = "#";
        galleryLink.textContent = "Click to view images";
        card.querySelector('.project-details')?.appendChild(galleryLink);
    }
    galleryLink.onclick = (e) => {
        e.preventDefault();
        const modal = document.getElementById('imageModal');
        const container = document.getElementById('modal-container');
        const keyOverlay = document.getElementById('modal-key-overlay');
        container.innerHTML = '';
        currentScale = 1;
        modalIndex = 0;
        activeFilter = 'all';
        if (project.title.includes("Networks")) {
            keyOverlay.style.display = 'block';
        }
        else {
            keyOverlay.style.display = 'none';
        }
        project.images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            container.appendChild(img);
        });
        const networkFilters = document.getElementById('network-filters');
        networkFilters.style.display = project.title.includes("Networks") ? 'flex' : 'none';
        updateModalDisplay(container);
        modal.style.display = 'flex';
    };
    // Ensure it hides when closing
    document.querySelector('.close-modal')?.addEventListener('click', () => {
        document.getElementById('imageModal').style.display = 'none';
        document.getElementById('modal-key-overlay').style.display = 'none';
    });
}
// --- 5. Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Carousel Nav
    document.getElementById('prevBtn')?.addEventListener('click', () => switchProject(-1));
    document.getElementById('nextBtn')?.addEventListener('click', () => switchProject(1));
    // Modal Global Controls
    document.querySelector('.close-modal')?.addEventListener('click', () => {
        document.getElementById('imageModal').style.display = 'none';
    });
    const modalContainer = document.getElementById('modal-container');
    document.getElementById('zoomIn').onclick = () => {
        currentScale += 0.2;
        updateModalDisplay(modalContainer);
    };
    document.getElementById('zoomOut').onclick = () => {
        if (currentScale > 0.4)
            currentScale -= 0.2;
        updateModalDisplay(modalContainer);
    };
    // Navigation Listeners (Place these inside your DOMContentLoaded block)
    document.getElementById('modalNext').onclick = () => {
        const images = modalContainer.querySelectorAll('img');
        // Ensure we don't go past the last image
        if (modalIndex < images.length - 1) {
            modalIndex++;
            updateModalDisplay(modalContainer);
        }
    };
    document.getElementById('modalPrev').onclick = () => {
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
            updateModalDisplay(document.getElementById('modal-container'));
        };
        physicalBtn.onclick = () => {
            activeFilter = 'physical';
            modalIndex = 0;
            updateModalDisplay(document.getElementById('modal-container'));
        };
    }
    // Project List Modal Setup
    const projectListBtn = document.getElementById('projectListBtn');
    const projectListModal = document.getElementById('projectListModal');
    const projectListItems = document.getElementById('projectListItems');
    const closeProjectList = document.querySelector('.close-project-list');
    if (projectListBtn && projectListModal && projectListItems) {
        // Populate project list
        projectListItems.innerHTML = '';
        projects.forEach((project, index) => {
            const item = document.createElement('div');
            item.className = `project-list-item ${index === currentIndex ? 'active' : ''}`;
            item.textContent = project.title;
            item.onclick = () => {
                currentIndex = index;
                switchProject(0);
                projectListModal.style.display = 'none';
                // Update active state in list
                document.querySelectorAll('.project-list-item').forEach((el, i) => {
                    if (i === index) {
                        el.classList.add('active');
                    }
                    else {
                        el.classList.remove('active');
                    }
                });
            };
            projectListItems.appendChild(item);
        });
        // Open modal on button click
        projectListBtn.onclick = () => {
            projectListModal.style.display = 'block';
        };
        // Close modal on X click
        if (closeProjectList) {
            closeProjectList.onclick = () => {
                projectListModal.style.display = 'none';
            };
        }
        // Close modal when clicking outside of it
        window.onclick = (event) => {
            if (event.target === projectListModal) {
                projectListModal.style.display = 'none';
            }
        };
    }
});
//# sourceMappingURL=main.js.map