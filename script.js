// Skills populator
// Reads data from json and populates by categories

const skills_general = document.getElementById('skills-general'); 
const skills_technical = document.getElementById('skills-technical'); 

fetch("data/skills.json")
    .then(response => {
        if (!response.ok) throw new Error("Network response was not ok.");
        return response.json();
    })
    .then(skillsData => {
        // REMOVED .map() from the end here:
        const generalSkills = skillsData
            .filter(item => item["skill-tag"] === 'General')
            .sort((a,b) => a["skill-rank"] - b["skill-rank"]);
            
        // REMOVED .map() from the end here:
        const technicalSkills = skillsData
            .filter(item => item["skill-tag"] === 'Technical')
            .sort((a,b) => a["skill-rank"] - b["skill-rank"]);
        
        generalSkills.forEach(item => {
            const skillCard = `
            <div class="skill-card">
                <span class="skill-card-ic"><i class="fa-solid fa-${item["skill-alias"]}"></i></span>
                <span class="skill-card-btn">${item["skill"]}</span>
            </div>
            `;
            skills_general.insertAdjacentHTML("beforeend", skillCard);
        });

        technicalSkills.forEach(item => {
            const skillCard = `
            <div class="skill-card">
                <span class="skill-card-ic"><i class="fa-solid fa-${item["skill-alias"]}"></i></span>
                <span class="skill-card-btn">${item["skill"]}</span>
            </div>
            `;
            skills_technical.insertAdjacentHTML("beforeend", skillCard);
        });
    })
    .catch(error => {
        console.error("Error fetching JSON data:", error);
        if(skills_general) skills_general.innerHTML = `<p style="color:red;">Failed to load skills data.</p>`;
        if(skills_technical) skills_technical.innerHTML = `<p style="color:red;">Failed to load skills data.</p>`;
    });