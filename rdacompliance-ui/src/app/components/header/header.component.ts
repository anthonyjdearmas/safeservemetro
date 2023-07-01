import { Inject, PLATFORM_ID, Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public mobileMode: boolean = false;
  public isAuthenticated: boolean = false;
  public isShown: boolean = false;
  private platformId: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.platformId = platformId;
  }

  ngOnInit(): void {
    this.authService.isUserLoggedIn$.subscribe((value) => {
      this.isAuthenticated = localStorage.getItem("isUserLoggedIn$") === "true";
    });

    if (isPlatformBrowser(this.platformId) && window.innerWidth < 1150) {
      this.toggleMobileModeSetting();
    }
  }

  logout(): void {
    localStorage.removeItem("token");
    this.authService.isUserLoggedIn$.next(false);
    this.router.navigate(["/login"]);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (!this.mobileMode && window.innerWidth < 1150 && isPlatformBrowser(this.platformId)) {
      this.toggleMobileModeSetting();
    } else if (this.mobileMode && window.innerWidth > 1150 && isPlatformBrowser(this.platformId)) {
      this.toggleMobileModeSetting();
    }
  }

  public toggleMobileModeSetting(): void {
    if (this.mobileMode) {
      this.mobileMode = false;
      let nav_links = document.getElementsByClassName('nav-link');
      for (let i = 0; i < nav_links.length; i++) {
        nav_links[i].removeAttribute('data-toggle');
        nav_links[i].removeAttribute('data-target');
      }
    } else {
      this.mobileMode = true;
      let nav_links = document.getElementsByClassName('nav-link');
      for (let i = 0; i < nav_links.length; i++) {
        nav_links[i].setAttribute('data-toggle', 'collapse');
        nav_links[i].setAttribute('data-target', '#navbarSupportedContent');
      }
    }
  }
}
