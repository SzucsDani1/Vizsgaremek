const fileInput = document.getElementById('fileInput');
        const profilePicture = document.getElementById('profilePicture');
        const removeButton = document.getElementById('removeButton');
        
        fileInput.addEventListener('change', function() {
            removeButton.hidden = false;
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profilePicture.innerHTML = `<img src="${e.target.result}" alt="Profilkép">`;
                    removeButton.style.display = 'block';
                }
                reader.readAsDataURL(file);
            }
        });
        
        removeButton.addEventListener('click', function() {
            profilePicture.innerHTML = 'Nincs profilkép';
            fileInput.value = "";
            removeButton.style.display = 'none';
        });