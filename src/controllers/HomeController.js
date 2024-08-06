class HomeController {
  async index(req, res) {
    return res.json('Seja bem vindo!');
  }
}

export default new HomeController();
