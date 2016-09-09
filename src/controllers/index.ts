import { Request, Response } from 'express';

export class Index {
  public ctrl(req: Request, res: Response): void {
    res.render('index', {
      title: 'Express5TS Quick Start'
    });
  }
}
