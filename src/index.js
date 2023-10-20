import { createApp } from 'vue'
import axios from 'axios'

createApp({
    //el: '#app',
    data() {
        return {
            students: [],
            search: '',
            newStudent: {
                name: '',
                group: '',
                mark: null,
                isDonePr: false,
                photo: ''
            }
        }},
    created() {
        this.fetchStudents();
    },
    computed: {
        filteredStudents() {
            const searchTerm = this.search.toLowerCase();
            return this.students.map(student => {
                const highlighted = searchTerm && student.name.toLowerCase().includes(searchTerm);
                return { ...student, highlighted };
            });
        }
    },
    methods: {
        fetchStudents() {
            axios.get('http://34.82.81.113:3000/students')
                .then(response => {
                    this.students = response.data;
                })
                .catch(error => {
                    console.error('Помилка при завантаженні студентів:', error);
                });
        },
        removeStudent(id) {
            axios.delete(`http://34.82.81.113:3000/students/${id}`)

                .then(() => {
                    this.fetchStudents();
                })
                .catch(error => {
                    console.error('Помилка при видаленні студента:', error);
                });
        },
        addStudent() {
            axios.post('http://34.82.81.113:3000/students', this.newStudent)
                .then(() => {
                    this.fetchStudents();
                    this.newStudent = {
                        name: '',
                        group: '',
                        mark: null,
                        isDonePr: false,
                        photo: ''
                    };
                })
                .catch(error => {
                    console.error('Помилка при додаванні студента:', error);
                });
        }
    }
}).mount('#app');
