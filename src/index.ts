export function bindToForm(form: any, obj: any): void {
  for (const f of form) {
    let ctrl = f;
    if (ctrl.name !== null && ctrl.name !== '') {
      let v = obj[ctrl.name];
      if (v === undefined || v === null) {
        v = null;
      }
      ctrl = v;
    }
  }
}

export function readOnly(form: any): void {
  if (!form) {
    return;
  }
  for (const ctrl of form) {
    const name = ctrl.getAttribute('name');
    if (name != null && name.length > 0 && name !== 'btnBack') {
      let nodeName = ctrl.nodeName;
      const type = ctrl.getAttribute('type');
      if (nodeName === 'INPUT' && type !== null) {
        nodeName = type.toUpperCase();
      }
      if (nodeName !== 'BUTTON'
        && nodeName !== 'RESET'
        && nodeName !== 'SUBMIT'
        && nodeName !== 'SELECT') {
        switch (type) {
          case 'checkbox':
            ctrl.disabled = true;
            break;
          case 'radio':
            ctrl.disabled = true;
            break;
          default:
            ctrl.readOnly = true;
        }
      } else {
        ctrl.disabled = true;
      }
    }
  }
}

export function focusFirstElement(form: any): void {
  let i = 0;
  const len = form.length;
  for (i = 0; i < len; i++) {
    const ctrl = form[i];
    if (!(ctrl.readOnly || ctrl.disabled)) {
      let nodeName = ctrl.nodeName;
      const type = ctrl.getAttribute('type');
      if (type) {
        const t = type.toUpperCase();
        if (t === 'SUBMIT') {
          ctrl.focus();
        }
        if (nodeName === 'INPUT') {
          nodeName = t;
        }
      }
      if (nodeName !== 'BUTTON'
        && nodeName !== 'RESET'
        && nodeName !== 'SUBMIT'
        && nodeName !== 'CHECKBOX'
        && nodeName !== 'RADIO') {
        ctrl.focus();
        try {
          ctrl.setSelectionRange(0, ctrl.value.length);
        } catch (err) {
        }
        return;
      }
    }
  }
}

export function focusFirstError(form: any, className?: string): void {
  const len = form.length;
  if (className && className.length > 0) {
    for (let i = 0; i < len; i++) {
      const ctrl = form[i];
      const parent = ctrl.parentElement;
      if (ctrl.classList.contains(className)
        || parent.classList.contains(className)) {
        ctrl.focus();
        ctrl.scrollIntoView();
        return;
      }
    }
  } else {
    for (let i = 0; i < len; i++) {
      const ctrl = form[i];
      const parent = ctrl.parentElement;
      if (ctrl.classList.contains('invalid')
        || ctrl.classList.contains('.ng-invalid')
        || parent.classList.contains('invalid')) {
        ctrl.focus();
        ctrl.scrollIntoView();
        return;
      }
    }
  }
}

export function element(form: any, childName: string): any {
  for (const f of form) {
    if (f.name === childName) {
      return f;
    }
  }
  return null;
}

export function elements(form: any, childNames: string[]): any[] {
  const outputs = [];
  for (const f of form) {
    for (const child of childNames) {
      if (child === f.name) {
        outputs.push(f);
      }
    }
  }
  return outputs;
}

export function parentByClass(ctrl: any, className: string): any {
  if (!ctrl) {
    return null;
  }
  let tmp = ctrl;
  while (true) {
    const parent = tmp.parentElement;
    if (!parent) {
      return null;
    }
    if (parent.classList.contains(className)) {
      return parent;
    } else {
      tmp = parent;
    }
    if (tmp.nodeName === 'BODY') {
      return null;
    }
  }
}

export function getDataFields(form: any): any[] {
  let results = [];
  const attributeValue = form.getAttribute('data-field');
  if (attributeValue && attributeValue.length > 0) {
    results.push(form);
  }
  const childNodes = form.childNodes;
  if (childNodes.length > 0) {
    for (const childNode of childNodes) {
      if (childNode.nodeType === Node.ELEMENT_NODE) {
        results = results.concat(getDataFields(childNode));
      }
    }
  }
  return results;
}
