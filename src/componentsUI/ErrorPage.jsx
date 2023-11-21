import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

function ErrorPage({ error }) {
  const errorMessage =
    error instanceof Error ? error.message : "Error desconocido";

  return (
    <div className="flex flex-wrap justify-center items-center space-x-4 p-4 my-4">
      <div id="errorPage">
       <ExclamationTriangleIcon className="h-8 w-8"/> <h1>Oops!</h1>
        <p>Lo lamentamos, ha ocurrido un error inesperado</p>
        {errorMessage && (
          <p>
            <i>{errorMessage}</i>
          </p>
        )}
      </div>
    </div>
  );
}

export default ErrorPage;
