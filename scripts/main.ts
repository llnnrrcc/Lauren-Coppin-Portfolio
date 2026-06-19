// Define your project data
const projects = [
    { title: "PetSync (SETAP-B)", desc: "Mobile hub for pet health..." },
    { title: "Project Two", desc: "Description of the second project..." }
];

let currentIndex = 0;

export function switchProject(direction: number): void {
    currentIndex = (currentIndex + direction + projects.length) % projects.length;
    
    const card = document.querySelector('.project-card') as HTMLElement;
    if (!card) return;

    // Trigger animation
    card.classList.remove('slide-in');
    void card.offsetWidth; // Force reflow to restart animation
    card.classList.add('slide-in');

    // If you want to update the purpose (the first list item):
const purposeElement = card.querySelector('.project-details li strong'); 
// Or target the text directly:
const listItems = card.querySelectorAll('.project-details li');
// listItems[0] would be your first bullet point.
}

// Bind events
document.getElementById('prevBtn')?.addEventListener('click', () => switchProject(-1));
document.getElementById('nextBtn')?.addEventListener('click', () => switchProject(1));