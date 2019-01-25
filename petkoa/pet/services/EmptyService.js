class EmptyService {

  async out(ctx) {
    ctx.body = 'NO_PAGE'
  }

}

exports.service = EmptyService
