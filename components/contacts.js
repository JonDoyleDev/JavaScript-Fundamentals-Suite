document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const noteInput = document.getElementById('note');
    const addContactButton = document.getElementById('add-contact');
    const contactList = document.getElementById('contact-list');

    let contacts = [];

    function renderContacts() {
        contactList.innerHTML = '';
        contacts.forEach((contact, index) => {
            const contactItem = document.createElement('li');
            contactItem.innerHTML = `
                <span>${contact.name} - ${contact.phone} - ${contact.email} - ${contact.note}</span>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            contactList.appendChild(contactItem);
        });

        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                contacts.splice(index, 1);
                renderContacts();
            });
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePhone(phone) {
        const re = /^[0-9]{10}$/;
        return re.test(String(phone));
    }

    addContactButton.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const email = emailInput.value.trim();
        const note = noteInput.value.trim();

        if (!name || !phone || !email) {
            alert('Please fill in all fields');
            return;
        }

        if (!validatePhone(phone)) {
            alert('Please enter a valid 10-digit phone number');
            return;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        contacts.push({ name, phone, email, note });
        nameInput.value = '';
        phoneInput.value = '';
        emailInput.value = '';
        noteInput.value = '';
        renderContacts();
    });

    renderContacts();
});
