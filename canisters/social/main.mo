import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Principal "mo:base/Principal";

// Define el tipo de datos para representar una tarea
actor Welcome {
  public query func greet(name : Text) : async Text {
    return "Welcome " # name # " to EnfoKT";
  };

  type User = Principal;

  type Task = {
    id : Nat;
    name : Text;
    description : Text;
    dateCreated : Time;
  };

  // Lista de tareas almacenadas en la cadena de bloques
  var tasks : [Task] = [];

  // Función para agregar una nueva tarea
  public func addTask(name : Text, description : Text) : async Nat {
    let newTask : Task = {
      id = tasks.length + 1;
      name = name;
      description = description;
      datteCreated = Time.now();
    };
    tasks := tasks ++ [newTask];
    return newTask.id;
  };

  // Función para obtener la lista de tareas
  public func getTasks() : async [Task] {
    return tasks;
  };

  // Función para actualizar una tarea existente
  public func updateTask(id : Nat, name : Text, description : Text) : async Bool {
    let updatedTasks = Array.map(
      tasks,
      {
        task | if (task.id == id) {
          { id; name; description; dateCreated = task.dateCreated };
        } else {
          task;
        };
      },
    );
    tasks := updatedTasks;
    return true;
  };

  // Función para eliminar una tarea
  public func deleteTask(id : Nat) : async Bool {
    if (id <= Array.length(tasks)) {
      tasks := Array.remove(id - 1, tasks);
      return true;
    } else {
      return false;
    };
  };
};
