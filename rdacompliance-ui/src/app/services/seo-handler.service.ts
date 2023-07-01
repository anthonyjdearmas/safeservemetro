import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoHandlerService {

  constructor(private metaService: Meta, private titleService: Title) { }

  setBrowserTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  setMetaDescription(description: string): void {
    this.metaService.addTag({ name: 'description', content: description });
  }

  setKeywords(keywords: string[]): void {
    let keywordsString = '';
    keywords.forEach((keyword, index) => {
      if (index === keywords.length - 1) {
        keywordsString += keyword;
      } else {
        keywordsString += keyword + ', ';
      }
    });
    this.metaService.addTag({ name: 'keywords', content: keywordsString });
  }

  setMetaRobots(robot_enum: number): void {
    const enumerations = ['index, follow', 'noindex, follow', 'index, nofollow', 'noindex, nofollow'];
    this.metaService.addTag({ name: 'robots', content: enumerations[robot_enum] });
  }

}