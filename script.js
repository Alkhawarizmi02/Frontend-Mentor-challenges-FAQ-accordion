// Select all accordion questions
const accordionQuestions = document.querySelectorAll('.accordion-question');

// Function to reset all accordions and icons to their default state
function resetAccordions() {
    accordionQuestions.forEach(question => {
        const icon = question.querySelector('img');
        const accordionAnswer = question.nextElementSibling;

        icon.src = '/assets/images/icon-plus.svg';
        accordionAnswer.classList.remove('toggle');
        question.querySelector('.toggleButton').setAttribute('aria-expanded', 'false');
    });
}

// Function to toggle the accordion and icon for the clicked button or question
function toggleAccordion(accordionQuestion) {
    const icon = accordionQuestion.querySelector('img');
    const accordionAnswer = accordionQuestion.nextElementSibling;
    const isCurrentlyOpen = accordionAnswer.classList.contains('toggle');

    if (isCurrentlyOpen) {
        // Close the accordion
        accordionAnswer.classList.remove('toggle');
        icon.src = '/assets/images/icon-plus.svg';
        accordionQuestion.querySelector('.toggleButton').setAttribute('aria-expanded', 'false');
    } else {
        // Open the accordion
        icon.classList.add('fade-out');

        icon.addEventListener('transitionend', () => {
            icon.src = '/assets/images/icon-minus.svg';
            icon.classList.replace('fade-out', 'fade-in');

            icon.addEventListener('transitionend', () => {
                icon.classList.remove('fade-in');
            }, { once: true });

            accordionAnswer.classList.add('toggle');
            accordionQuestion.querySelector('.toggleButton').setAttribute('aria-expanded', 'true');
        }, { once: true });
    }
}

// Main event listener for each accordion question
accordionQuestions.forEach(accordionQuestion => {
    accordionQuestion.addEventListener('click', () => {
        const accordionAnswer = accordionQuestion.nextElementSibling;
        const isCurrentlyOpen = accordionAnswer.classList.contains('toggle');

        // If the clicked accordion is already open, close it without resetting others
        if (isCurrentlyOpen) {
            toggleAccordion(accordionQuestion);
        } else {
            resetAccordions();
            toggleAccordion(accordionQuestion);
        }
    });
});
