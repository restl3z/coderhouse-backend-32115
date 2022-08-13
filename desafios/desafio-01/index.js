class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre; // string
    this.apellido = apellido; // string
    this.libros = [libros]; // [object]
    this.mascotas = [mascotas]; // [string]
  }

  getFullName = () => {
    return `El nombre del usuario es ${this.nombre} ${this.apellido}.`;
  };

  addMascota = (newMascota) => {
    this.mascotas.push(newMascota);
  };

  countMascotas = () => {
    return this.mascotas.length;
  };

  addBook = (bookName, bookAuthor) => {
    this.libros.push({
      nombre: bookName,
      autor: bookAuthor,
    });
  };

  getBookNames = () => {
    return this.libros.map((x) => x.nombre);
  };
}

let mascotas_prueba1 = "Buddy";
let mascotas_prueba2 = "Max";

let libros_prueba1 = { nombre: "Moby Dick", autor: "Herman Melville" };
let libros_prueba2 = { nombre: "Hamlet", autor: "William Shakespeare" };

let usuario1 = new Usuario("Frank", "Grimes", libros_prueba1, mascotas_prueba1);

console.log(usuario1.getFullName()); // Frank Grimes
console.log(usuario1.countMascotas()); // 1
console.log(usuario1.getBookNames()); // ["Moby Dick"]

usuario1.addMascota(mascotas_prueba2);
usuario1.addBook(libros_prueba2.nombre, libros_prueba2.autor);

console.log(usuario1.countMascotas()); // 2
console.log(usuario1.getBookNames()); // ["Moby Dick", "Hamlet"]
