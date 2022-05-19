import { FastApi, Rest, Get, Validate } from '../../src'

@Rest
export class MyDynamicRoute extends FastApi {

  @Get('/posts/:year/:month/:day')
  @Validate()
  public posts(year: string, month: number, day: number) {

    this.$json({
      date: [year, month, day].join('-')
    })
  }

  @Get('/news/:year/:month/:day(/:slug)')
  public news(...args: string[]) {
    console.log('news args', args)
    this.$text(args.join('_'))
  }

}
