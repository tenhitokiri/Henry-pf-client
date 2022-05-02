async function buyCart() {
    let sandboxUrl = await axios.post("http://localhost:5000/movement/prueba", { buyer: "4" })
        .then((response) => {
            console.log("\n\n\n\n\n\n\nRES DEL \nAXIOS\n\n\n\n\ ", response.data, "\n\n\n\n");
            return response.data;
        }).catch(console.log);
    if (typeof sandboxUrl !== "string") console.log("!!!!!!!!!!!!!!!!!!");
    else window.location.href = sandboxUrl;
}