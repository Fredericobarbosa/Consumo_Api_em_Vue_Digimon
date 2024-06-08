const { createApp } = Vue;

createApp({
    data() {
        return {
            digimons: [],
            searchText: '',
        }
    },
    computed: {
        filteredDigimons() {
            return this.digimons.filter(digimon =>
                digimon.name.toLowerCase().includes(this.searchText.toLowerCase())
            );
        }
    },
    methods: {
        async fetchDigimons() {
            try {
                const response = await fetch('https://digimon-api.vercel.app/api/digimon');
                const data = await response.json();
                this.digimons = data.map(digimon => ({
                    ...digimon,
                    showDetails: true
                }));
            } catch (err) {
                console.error('Erro ao buscar os Digimons:', err);
            }
        },
        getLevelClass(level) {
            const levelClassMap = {
                Rookie: 'rookie',
                Champion:'champion',
                Ultimate:'ultimate',
                Mega:'mega',
                Armor: 'armor',
                Fresh: 'fresh',
                Training: 'training',
                'In Training': "in-Training"
            };
            return levelClassMap[level] || '';
        }
    }
}).mount("#app");
