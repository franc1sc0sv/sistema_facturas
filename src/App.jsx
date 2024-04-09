import { useEffect, useState } from "react";
import { Form } from "./Components/Form";
import { List } from "./Components/List";

function App() {
  const [pacientes, setPacientes] = useState(() => {
    const pacientes = window.localStorage.getItem("pacientes");
    return JSON.parse(pacientes) ?? [];
  });
  const [pacientEdit, setPacientEdit] = useState({});

  useEffect(() => {
    window.localStorage.setItem("pacientes", JSON.stringify(pacientes));
  }, [pacientes]);

  const deletePacient = ({ id }) => {
    const Updatedpacientes = pacientes.filter((x) => x.id !== id);
    setPacientes(Updatedpacientes);
  };
  const clean_productos = () => {
    setPacientes([]);
  };
  return (
    <>
      <main className="w-4/5 mx-auto mb-5 flex flex-col gap-10 mt-20">
        <h1 className="font-black text-5xl text-center md:w-2/3 mx-auto">
          Sistema de facturacion{" "}
          <span className="text-indigo-700">Sencilla</span>
        </h1>

        <div className="flex flex-col gap-10 md:flex-row">
          <Form
            setPacientes={setPacientes}
            pacientes={pacientes}
            pacientEdit={pacientEdit}
            setPacientEdit={setPacientEdit}
          />
          <List
            clean_productos={clean_productos}
            pacientes={pacientes}
            deletePacient={deletePacient}
            setPacientEdit={setPacientEdit}
          />
        </div>
      </main>
    </>
  );
}

export default App;
