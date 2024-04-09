import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import React from "react";

export const List = ({
  pacientes,
  deletePacient,
  setPacientEdit,
  clean_productos,
}) => {
  const calculateSubtotal = () => {
    return pacientes.reduce(
      (subtotal, paciente) =>
        subtotal + parseFloat(paciente.price) * parseInt(paciente.amount),
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const impuesto = subtotal * 0.1;
    return subtotal + impuesto;
  };

  const print = () => {
    window.print();
  };

  return (
    <>
      <section className="w-full flex flex-col gap-10 justify-between">
        <div className="flex flex-col gap-10 ">
          <div className="w-full flex flex-col gap-5 items-center">
            <p className="text-3xl font-extrabold text-center text-gray-800">
              Listado de Productos
            </p>
            <p className="text-gray-600">
              Administra tus{" "}
              <span className="font-bold text-indigo-600">productos</span> de
              manera más sencilla
            </p>
          </div>

          <div className="flex flex-col gap-5 md:overflow-y-auto max-h-[350px] overflow-hidden">
            <Table
              pacientes={pacientes}
              deletePacient={deletePacient}
              setPacientEdit={setPacientEdit}
            />
          </div>
        </div>
        <div className="w-full a flex py-3 px-5 h-min shadow-xl gap-5 rounded-lg items-center justify-between">
          <div className="flex gap-10 ">
            <div className="flex gap-2">
              <p className="text-gray-800 font-semibold">Subtotal: </p>
              <p className="text-gray-600">
                {" "}
                {calculateSubtotal().toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
            </div>
            <div className="flex gap-2">
              <p className="text-gray-800 font-semibold">Total: </p>
              <p className="text-gray-600">
                {" "}
                {calculateTotal().toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
            </div>
          </div>
          <div className="flex gap-5">
            <button
              onClick={print}
              className="content-no-printable  bg-black text-white px-4 rounded-full py-1 font-bold hover:bg-white hover:text-black transition-all duration-200 hover:shadow-lg"
            >
              Generar
            </button>
            <button
              onClick={clean_productos}
              className="content-no-printable  bg-black text-white px-4 rounded-full py-1 font-bold hover:bg-white hover:text-black transition-all duration-200 hover:shadow-lg"
            >
              Limpiar
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

const Table = ({ pacientes, deletePacient, setPacientEdit }) => {
  return (
    <table className="min-w-full">
      <thead>
        <tr className="bg-indigo-600 text-white">
          <th className="px-4 py-2 capitalize">nombre</th>
          <th className="px-4 py-2 capitalize">cantidad</th>
          <th className="px-4 py-2 capitalize">precio unitario</th>
          <th className="px-4 py-2 capitalize">subtotal</th>
          <th className="px-4 py-2 capitalize">acciones</th>
        </tr>
      </thead>
      <tbody>
        <TableBody
          pacientes={pacientes}
          deletePacient={deletePacient}
          setPacientEdit={setPacientEdit}
        />
      </tbody>
    </table>
  );
};

const TableBody = ({ pacientes, deletePacient, setPacientEdit }) => {
  return pacientes.length === 0 ? (
    <tr>
      <td className="px-4 py-2" colSpan="5">
        No hay datos para mostrar
      </td>
    </tr>
  ) : (
    pacientes.map((paciente, index) => (
      <Row
        key={paciente.id}
        paciente={paciente}
        deletePacient={deletePacient}
        setPacientEdit={setPacientEdit}
        index={index}
      />
    ))
  );
};

const Row = ({ paciente, deletePacient, setPacientEdit, index }) => {
  const { id, name, amount, price } = paciente;
  const handleEliminar = () => {
    deletePacient({ id });
  };

  const handleEdit = () => {
    setPacientEdit(paciente);
  };

  const calculateSubtotal = (quantity, price) => {
    return (quantity * price).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  // Conditional class for alternate row color
  const rowColorClass = index % 2 === 0 ? "bg-gray-100" : "bg-gray-200";

  return (
    <tr key={id} className={`border ${rowColorClass}`}>
      <td className="px-4 py-2">{name}</td>
      <td className="px-4 py-2">{amount}</td>
      <td className="px-4 py-2">
        {Number(price).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </td>
      <td className="px-4 py-2">{calculateSubtotal(amount, price)}</td>
      <td className="px-4 py-2 flex gap-5">
        <MdEdit
          className="cursor-pointer fill-indigo-600"
          size={28}
          onClick={handleEdit}
        />
        <MdDelete
          className="cursor-pointer fill-red-500"
          size={28}
          onClick={handleEliminar}
        />
      </td>
    </tr>
  );
};
