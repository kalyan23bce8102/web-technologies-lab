const surveyData = [
    {
        id: "q1",
        label: "What is your full name?",
        type: "text",
        required: true,
        limit: 40
    },
    {
        id: "q2",
        label: "How did you hear about us?",
        type: "radio",
        options: ["Social Media", "Friend / Family", "Advertisement", "Search Engine", "Other"],
        required: true
    },
    {
        id: "q3",
        label: "Which features do you use most often? (select at least 2)",
        type: "checkbox",
        options: ["Dashboard & Analytics", "Reports & Exports", "API Access", "Mobile App", "Team Collaboration"],
        minSelection: 2
    },
    {
        id: "q4",
        label: "Any additional comments or suggestions?",
        type: "text",
        required: false,
        limit: 300
    }
];

const container = document.getElementById('survey-container');
const form = document.getElementById('dynamicForm');
const submitBtn = document.getElementById('submitBtn');

function buildSurvey() {
    surveyData.forEach(question => {
        const block = document.createElement('div');
        block.className = 'question-block';
        block.id = `block-${question.id}`;

        const label = document.createElement('label');
        label.className = 'question-label';
        label.innerText = question.label + (question.required ? ' *' : '');
        block.appendChild(label);

        if (question.type === 'text') {
            const input = document.createElement('input');
            input.type = 'text';
            input.id = question.id;
            input.placeholder = question.limit ? `Max ${question.limit} characters` : '';
            input.maxLength = question.limit || '';
            block.appendChild(input);
        }
        else if (question.type === 'radio') {
            question.options.forEach(option => {
                const wrapper = document.createElement('label');
                wrapper.className = 'option-item';

                const input = document.createElement('input');
                input.type = 'radio';
                input.name = question.id;
                input.value = option;
                input.id = `${question.id}-${option.replace(/\s+/g, '-')}`;

                const text = document.createTextNode(option);
                wrapper.appendChild(input);
                wrapper.appendChild(text);
                block.appendChild(wrapper);
            });
        }
        else if (question.type === 'checkbox') {
            question.options.forEach(option => {
                const wrapper = document.createElement('label');
                wrapper.className = 'option-item';

                const input = document.createElement('input');
                input.type = 'checkbox';
                input.name = question.id;
                input.value = option;
                input.id = `${question.id}-${option.replace(/\s+/g, '-')}`;

                wrapper.appendChild(input);
                wrapper.appendChild(document.createTextNode(option));
                block.appendChild(wrapper);
            });
        }

        // Error message container
        const error = document.createElement('div');
        error.className = 'error-msg';
        error.id = `error-${question.id}`;
        block.appendChild(error);

        container.appendChild(block);
    });
}

function validateForm() {
    let isValid = true;

    surveyData.forEach(q => {
        const block = document.getElementById(`block-${q.id}`);
        const errorEl = document.getElementById(`error-${q.id}`);
        let message = "";
        let fieldValid = true;

        if (q.type === 'text') {
            const input = document.getElementById(q.id);
            const value = input.value.trim();

            if (q.required && !value) {
                fieldValid = false;
                message = "This field is required.";
            }
            else if (q.limit && value.length > q.limit) {
                fieldValid = false;
                message = `Maximum ${q.limit} characters allowed.`;
            }
        }

        else if (q.type === 'radio') {
            const selected = document.querySelector(`input[name="${q.id}"]:checked`);
            if (q.required && !selected) {
                fieldValid = false;
                message = "Please select an option.";
            }
        }

        else if (q.type === 'checkbox') {
            const checkedCount = document.querySelectorAll(`input[name="${q.id}"]:checked`).length;
            if (checkedCount < q.minSelection) {
                fieldValid = false;
                message = `Please select at least ${q.minSelection} options.`;
            }
        }

        if (!fieldValid) {
            block.classList.add('invalid');
            errorEl.textContent = message;
            isValid = false;
        } else {
            block.classList.remove('invalid');
            errorEl.textContent = "";
        }
    });

    return isValid;
}

form.addEventListener('submit', e => {
    e.preventDefault();

    if (validateForm()) {
        const formData = {};
        surveyData.forEach(q => {
            if (q.type === 'text') {
                formData[q.id] = document.getElementById(q.id).value.trim();
            }
            else if (q.type === 'radio') {
                const selected = document.querySelector(`input[name="${q.id}"]:checked`);
                formData[q.id] = selected ? selected.value : null;
            }
            else if (q.type === 'checkbox') {
                const checked = Array.from(document.querySelectorAll(`input[name="${q.id}"]:checked`))
                                     .map(cb => cb.value);
                formData[q.id] = checked;
            }
        });

        console.log("Survey data:", formData);

        form.classList.add('hidden');
        document.getElementById('successMsg').classList.remove('hidden');
        submitBtn.disabled = true;
    }
});

container.addEventListener('input', () => {
    validateForm();
});
container.addEventListener('change', () => {
    validateForm();
});

buildSurvey();
