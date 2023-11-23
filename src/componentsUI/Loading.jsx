import { helix, tailChase, quantum, grid } from "ldrs";

quantum.register();
helix.register();
tailChase.register();
grid.register();

function Loading({ type }) {
  return (
    <>
      <div className="flex flex-wrap justify-center items-center space-x-4 p-4 my-4">
        <p>
          {type === "General" ? (
            <l-quantum size="150" speed="1.8" color="#09B90C"></l-quantum>
          ) : type === "NavBar" ? (
            <l-helix size="143" speed="2.2" color="#1F63EA"></l-helix>
          ) : type === "calcTotal" ? (
            <l-tail-chase size="90" speed="1.5" color="#1F63EA"></l-tail-chase>
          ) : type === "pedido" ? (
            <l-grid size="150" speed="1.5" color="#1191B0"></l-grid>
          ) : (
            <l-quantum size="150" speed="3" color="#09B90C"></l-quantum>
          )}
        </p>
      </div>
    </>
  );
}
export default Loading;
