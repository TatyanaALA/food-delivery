
window.addEventListener('DOMContentLoaded', () => {

  class CookieConsent {
    constructor({popup, btnConfirm, btnCancel, activeClass = ''} = {}) {
      this.popup = document.querySelector(popup);
      this.btnConfirm = document.querySelector(btnConfirm);
      this.btnCancel = document.querySelector(btnCancel);
      this.activeClass= activeClass;
      this.consentPropertyType = 'site_consent';
    }

    getItem = (key) => {
      const cookies = document.cookie.split(';')
                                     .map(cookie => cookie.split('='))
                                     .reduce((acc, [key, value]) => ({...acc, [key.trim()] : value}), {});

      return cookies[key]; 
    }

    setItem = (key, value) => {
      document.cookie = `${key}=${value};expires=Sun, 16 Jul 2024 06:23:41 GMT`;
    }

    hasConsented = () => this.getItem(this.consentPropertyType) === 'true' ? true : false;

    changeStatus = (prop) => {
      this.setItem(this.consentPropertyType, prop);
      if (this.hasConsented()) {
        // Подписка на сервисы
        myScripts(); 
      }
    }

    bindTriggers = () => {
      this.btnConfirm.addEventListener('click', () => {
        closePopup(this.changeStatus, true, this.activeClass, this.popup);
      });

      this.btnCancel.addEventListener('click', () => {
        closePopup(this.changeStatus, false, this.activeClass, this.popup);
      });
    }

    init = () => {
      try {
        if (this.hasConsented()) {
          myScripts();
        } else {
          this.popup.classList.add(this.activeClass);
        }

        this.bindTriggers();
      } catch(e) {
        console.error('Переданы не все данные');
      }
    }
  }

  new CookieConsent({
    popup: '.popup',
    btnConfirm: '[data-confirm]',
    btnCancel: '[data-cancel]',
    activeClass: 'popup_active'
  }).init();

  function myScripts() {
    console.log('Loading...');
  }

  function closePopup(changeStatus, bool, activeClass, popup) {
    if (changeStatus(bool)) {
      return popup.classList.remove(activeClass);
    }
  };
});