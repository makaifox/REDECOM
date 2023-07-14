import "./styles.css"

type TituloTypes ={
 titulo: string;
}

export function TituloPagina (props:TituloTypes) {
  return(
    <>
      <div className="titulo-secao">
        <h1>{props.titulo}</h1>
      </div>
    </>
  );
}
