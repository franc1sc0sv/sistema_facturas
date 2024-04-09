import { useForm } from "react-hook-form";

const generarId = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const Form = ({
  setPacientes,
  pacientes,
  pacientEdit,
  setPacientEdit,
}) => {
  const { register, handleSubmit, reset } = useForm({});

  const successSubmit = (data) => {
    if (!pacientEdit.id) {
      data.id = generarId();
      setPacientes([...pacientes, data]);
      reset();
      return;
    }

    data.id = pacientEdit.id;
    const pacientesActualizados = pacientes.map((paciente) =>
      paciente.id === pacientEdit.id ? data : paciente
    );
    setPacientes(pacientesActualizados);
    setPacientEdit({});
    reset();
  };
  return (
    <>
      <section className="w-full flex flex-col gap-10 content-no-printable">
        <div className="w-full flex flex-col gap-5 items-center">
          <p className=" text-3xl font-extrabold text-center">
            Sistema de facturacion
          </p>
          <p>
            Añade Productos y{" "}
            <span className="font-bold text-indigo-600"> Administralos</span>
          </p>
        </div>
        <div className=" w-full bg-white rounded-lg px-4 py-10 shadow-lg">
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(successSubmit)}
          >
            {/* <div className='w-full bg-red-700 text-white text-center font-bold py-2 rounded'>Llena todos campos</div> */}
            <Input
              labalName="Nombre del producto"
              register={register}
              name="name"
              placeHolder="Cinnamoroll"
              defaultValue={
                Object.keys(pacientEdit).length > 0 ? pacientEdit.name : ""
              }
            />
            <Input
              type="number"
              labalName="Cantidad de productos"
              register={register}
              name="amount"
              placeHolder="2"
              defaultValue={
                Object.keys(pacientEdit).length > 0 ? pacientEdit.amount : ""
              }
            />
            <Input
              type="number"
              labalName="Precio unitario"
              register={register}
              name="price"
              placeHolder="18.5"
              defaultValue={
                Object.keys(pacientEdit).length > 0 ? pacientEdit.price : ""
              }
            />

            <button
              type="submit"
              className="py-3 w-full bg-indigo-600 text-white uppercase font-bold"
            >
              {Object.keys(pacientEdit).length
                ? "Actualizar los datos"
                : "Agregar al paciente"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

const Input = ({
  labalName,
  name,
  register,
  placeHolder,
  defaultValue,
  type = "text",
}) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <label htmlFor="" className=" uppercase font-bold text-md text-gray-600">
        {labalName}
      </label>
      <input
        step="0.01"
        type={type}
        className="border w-full py-3 px-2"
        placeholder={placeHolder}
        {...register(name, { required: true })}
        defaultValue={defaultValue}
      />
    </div>
  );
};
