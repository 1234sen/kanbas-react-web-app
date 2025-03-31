export default function PathParameters_js(app) {
    app.get("/lab5/add/:a/:b", (req, res) => {
      const { a, b } = req.params;
      const sum = parseInt(a) + parseInt(b);
      res.send(sum.toString());
    });
    app.get("/lab5/subtract/:a/:b", (req, res) => {
      const { a, b } = req.params;
      const sum = parseInt(a) - parseInt(b);
      res.send(sum.toString());
    });
  };
  
  