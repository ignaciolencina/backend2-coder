export class GetController {
  static async getAdminPanel(_, res) {
    res.json({
      data: null,
      message: 'Estas en el panel del administrador',
    });
  }
}
