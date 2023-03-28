var tareas = new Tareas();
function Tareas (){};

Tareas.prototype.CrearDB = function (){
    var nombrecorto = 'v5';
    var version = '1.0';
    var nombrebase = 'List To-Do';
    var size = 50*1024*1024;    
    var db = openDatabase(nombrecorto, version, nombrebase, size);
    return db;
};
Tareas.prototype.Tabla = function (){
    var db, SqlLista;
    db = tareas.CrearDB();
    SqlLista = 'CREATE TABLE IF NOT EXISTS Tareas(id integer primary key autoincrement, task text, completed integer)';
    db.transaction(function (tx){
        tx.executeSql(SqlLista);
        
    });
};

Tareas.prototype.Insertar = function (name){
    var db, SqlInsert;
    db = tareas.CrearDB();
    SqlInsert = 'INSERT INTO Tareas(task,completed) VALUES(?,?)';
    db.transaction(function (tx){
        tx.executeSql(SqlInsert,[name,0]);
    });
    
};

Tareas.prototype.Eliminar = function (id){
    var db, Sql;
    db = tareas.CrearDB();
    Sql = 'DELETE FROM Tareas WHERE id = '+id;
    db.transaction(function (tx){
        tx.executeSql(Sql);
    });
    
};

Tareas.prototype.Consultar = function (callback){
    
    var db, SqlConsulta;
    db = tareas.CrearDB();
    
    SqlConsulta = 'SELECT * FROM Tareas';
    
     db.transaction( function (tx){
        
        tx.executeSql(SqlConsulta, [], (tx, results) => {
            callback(results);
        });
        
    });
}; 
Tareas.prototype.ToggleStatus = function (task){
    var db, SqlUpdate;
    db = tareas.CrearDB();
    SqlUpdate = 'UPDATE Tareas SET completed = '+ (task.completed?1:0) +' WHERE id = '+ task.id;
    db.transaction(function (tx){
        tx.executeSql(SqlUpdate);
    });
    
};

Tareas.prototype.EditTaskName = function (task){
    var db, SqlUpdate;
    db = tareas.CrearDB();
    SqlUpdate = 'UPDATE Tareas SET task = "'+ (task.name) +'" WHERE id = '+ task.id;
    db.transaction(function (tx){
        tx.executeSql(SqlUpdate);
    });
    
};
tareas.Tabla();
  export function getTasks(callback) {
     tareas.Consultar(callback);
}

export function newTask(task) {
    return tareas.Insertar(task);
}

export function deleteTask(id) {
    return tareas.Eliminar(id);
}

export function updateTask(task) {
    return tareas.ToggleStatus(task);
}

export function updateTaskName(task) {
    return tareas.EditTaskName(task);
}
