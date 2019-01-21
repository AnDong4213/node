class EmptyService {

  async out(ctx) {
    ctx.body = 'NO PAGE'
  }

}

exports.service = EmptyService
