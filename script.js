// Skills populator
// Reads data from json and populates by categories

const skills_general = document.getElementById('skills-general-list'); 
const skills_technical = document.getElementById('skills-technical-list'); 

fetch("data/skills.json")
    .then(response => {
        if (!response.ok) throw new Error("Network response was not ok.");
        return response.json();
    })
    .then(skillsData => {
        // collect General Skills
        const generalSkills = skillsData
            .filter(item => item["skill-tag"] === 'General')
            .sort((a,b) => a["skill-rank"] - b["skill-rank"]);
            
        // collect Technical Skills
        const technicalSkills = skillsData
            .filter(item => item["skill-tag"] === 'Technical')
            .sort((a,b) => a["skill-rank"] - b["skill-rank"]);
        
        // print General Skills
        generalSkills.forEach(item => {
            const skillCard = `
            <div class="skill-card">
                <span class="skill-card-ic"><i class="fa-${item["skill-alias-fill"]} fa-${item["skill-alias"]}"></i></span>
                <span class="skill-card-btn">${item["skill"]}</span>
            </div>
            `;
            skills_general.insertAdjacentHTML("beforeend", skillCard);
        });

        // print Technical Skills
        technicalSkills.forEach(item => {
            const skillCard = `
            <div class="skill-card">
                <span class="skill-card-ic"><i class="fa-${item["skill-alias-fill"]} fa-${item["skill-alias"]}"></i></span>
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