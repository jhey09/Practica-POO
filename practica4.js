const formulario = document.querySelector('#formulario');
const cardEstu = document.querySelector('#cardEstu');
const cardProf = document.querySelector('#cardProf');
const templateProf = document.querySelector('#templateProf').content;
const templateEstu = document.querySelector('#templateEstu').content;
const alert = document.querySelector('.alert')
const estudiantes = [];
const maestros = [];

document.addEventListener('click', (e) =>{
  if(e.target.dataset.id){
    
    if(e.target.matches(".btn-success")){
        estudiantes.map(item =>{
            if(item.id === e.target.dataset.id){
                item.setEstado = true;
            }
            console.log(item)
            return item;
        });

    }
    if(e.target.matches(".btn-danger")){
        estudiantes.map(item =>{
            if(item.id === e.target.dataset.id){
                item.setEstado = false;
            }
            console.log(item)
            return item;
        });
    }
    Persona.pintarPersonaUI(estudiantes, "Estudiante")

  }
} );

class Persona {
    constructor(nombre,edad){
        this.nombre = nombre;
        this.edad = edad;
        this.id = `${Date.now()}`;
    }

    static pintarPersonaUI(personas, tipo){
        if( tipo === "Estudiante"){
            cardEstu.textContent = "";
            const fragment = document.createDocumentFragment();

            personas.forEach(item => {
                fragment.appendChild(item.AgregarNuevoEstudiante());
                
            });
            cardEstu.appendChild(fragment);  
        }

        if( tipo === "maestro"){
            cardProf.textContent = "";
            const fragment = document.createDocumentFragment();

            personas.forEach(item => {
                fragment.appendChild(item.AgregarNuevoMaestro());
                
            });
            cardProf .appendChild(fragment);  
        }


    }
}

class Estudiante extends Persona{
    #estado = false;
    #estudiante = "estudiante";
    
    set setEstado(estado){
        this.#estado = estado;
    }
    get getEstado(){
        return this.#estudiante
    }
    
 AgregarNuevoEstudiante(){
    const clone = templateEstu.cloneNode(true)
    clone.querySelector("h5 .text-primary").textContent = this.nombre;
    clone.querySelector(".lead").textContent = this.edad;

    if(this.#estado){
        clone.querySelector(".badge").className = "badge bg-success";
        clone.querySelector(".btn-success").disabled = true;
        clone.querySelector(".btn-danger").disabled = false;
    }
    else{
        clone.querySelector(".badge").className = "badge bg-danger";
        clone.querySelector(".btn-danger").disabled = true;
        clone.querySelector(".btn-success").disabled = false;
    }
    clone.querySelector(".badge").textContent = this.#estado ? "Aprovado" : "Reprobado";
    
    clone.querySelector(".btn-success").dataset.id = this.id;
    clone.querySelector(".btn-danger").dataset.id = this.id;


    return clone;
 }

};

class Maestro extends Persona{

    #Maestro = "maestro"
    AgregarNuevoMaestro(){
        const clone = templateProf.cloneNode(true);
        clone.querySelector('h5').textContent = this.nombre;
        clone.querySelector('h6').textContent = this.#Maestro;
        clone.querySelector('.lead').textContent = this.edad;
        return clone;
    }

};

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    alert.classList.add('d-none')

    const datos = new FormData(formulario);
    
    const [nombre, edad, opcion] = [...datos.values()];

    if(!nombre.trim() ||!edad.trim() || !opcion.trim()){
        alert.classList.remove('d-none')
        return;
    }

    if(opcion === "Estudiante"){
        const estudiante = new Estudiante(nombre, edad);
        estudiantes.push(estudiante);
        Persona.pintarPersonaUI(estudiantes, opcion);

    }

    if(opcion === "maestro"){
        const maestro = new Maestro(nombre, edad);
        maestros.push(maestro);
        Persona.pintarPersonaUI(maestros, opcion);
    }
});
