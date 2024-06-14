const autorController = require("../controllers/autor.controller");

module.exports = (app) => {
    app.post("/api/author/new", autorController.createAutor);
    app.get("/api/authors", autorController.getAllAutores);
    app.get("/api/author/:id", autorController.getAutorById);
    app.put("/api/author/edit/:id", autorController.updateAutor);
    app.delete("/api/author/delete/:id", autorController.deleteAutor);
};