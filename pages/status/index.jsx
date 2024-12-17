import useSWR from "swr";
import { FaDatabase } from "react-icons/fa";

async function fetchAPI(key) {
  const response = await fetch(key);
  const status = await response.json();
  return status;
}

export default function StatusPage() {
  const response = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  return (
    <div className="p-10 h-screen bg-zinc-100">
      <UpdatedAt responseData={response} />

      <div className="pt-10">
        <DatabaseService responseData={response} />
      </div>
    </div>
  );
}

function UpdatedAt(props) {
  function renderUpdatedAt() {
    return (
      <div>
        <span>Última atualização: </span>
        <span>
          {new Date(props.responseData.data.updated_at).toLocaleString("pt-BR")}
        </span>
      </div>
    );
  }

  return props.responseData.isLoading ? (
    <div>Carregando...</div>
  ) : (
    renderUpdatedAt()
  );
}

function DatabaseService(props) {
  function renderDatabaseData() {
    return (
      <div className="bg-white rounded-sm shadow-md p-3 md:w-1/3">
        <p>
          <FaDatabase className="text-zinc-600 text-2xl inline mr-2 mb-4" />
          <span className="font-bold">Banco De Dados</span>
        </p>

        <div>
          <p>
            <span>Versão: </span>
            <span className="font-medium">
              {props.responseData.data.dependencies.database.version}
            </span>
          </p>
          <p>
            <span>Conexões Máximas: </span>
            <span className="font-medium">
              {props.responseData.data.dependencies.database.max_connections}
            </span>
          </p>
          <p>
            <span>Conexões Abertas: </span>
            <span className="font-medium">
              {props.responseData.data.dependencies.database.opened_connections}
            </span>
          </p>
        </div>
      </div>
    );
  }

  return props.responseData.isLoading ? (
    <div>Carregando...</div>
  ) : (
    renderDatabaseData()
  );
}
