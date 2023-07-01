import { TestBed } from '@angular/core/testing';
import { SeoHandlerService } from './seo-handler.service';
import { Meta, Title } from '@angular/platform-browser';

describe('SeoHandlerService', () => {
  let service: SeoHandlerService;
  let metaService: Meta;
  let titleService: Title;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Meta, Title]
    });
    service = TestBed.inject(SeoHandlerService);
    metaService = TestBed.inject(Meta);
    titleService = TestBed.inject(Title);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the browser title', () => {
    const title = 'Test Title';
    spyOn(titleService, 'setTitle');
    service.setBrowserTitle(title);
    expect(titleService.setTitle).toHaveBeenCalledWith(title);
  });

  it('should set the meta description', () => {
    const description = 'Test Description';
    spyOn(metaService, 'addTag');
    service.setMetaDescription(description);
    expect(metaService.addTag).toHaveBeenCalledWith({ name: 'description', content: description });
  });

  it('should set the keywords', () => {
    const keywords = ['test', 'keywords'];
    spyOn(metaService, 'addTag');
    service.setKeywords(keywords);
    expect(metaService.addTag).toHaveBeenCalledWith({ name: 'keywords', content: 'test, keywords' });
  });

  it('should set the meta robots', () => {
    const robot_enum = 0;
    spyOn(metaService, 'addTag');
    service.setMetaRobots(robot_enum);
    expect(metaService.addTag).toHaveBeenCalledWith({ name: 'robots', content: 'index, follow' });
  });
});
