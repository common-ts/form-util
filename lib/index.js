"use strict";
Object.defineProperty(exports,"__esModule",{value:true});
function bindToForm(form, obj){
  for (var _i=0, form_1=form; _i < form_1.length; _i++){
    var f=form_1[_i];
    var ctrl=f;
    if (ctrl.name !== null && ctrl.name !== ''){
      var v=obj[ctrl.name];
      if (v === undefined || v === null){
        v=null;
      }
      ctrl=v;
    }
  }
}
exports.bindToForm=bindToForm;
function readOnly(form){
  if (!form){
    return;
  }
  for (var _i=0, form_2=form; _i < form_2.length; _i++){
    var ctrl=form_2[_i];
    var name_1=ctrl.getAttribute('name');
    if (name_1 != null && name_1.length > 0 && name_1 !== 'btnBack'){
      var nodeName=ctrl.nodeName;
      var type=ctrl.getAttribute('type');
      if (nodeName === 'INPUT' && type !== null){
        nodeName=type.toUpperCase();
      }
      if (nodeName !== 'BUTTON'
        && nodeName !== 'RESET'
        && nodeName !== 'SUBMIT'
        && nodeName !== 'SELECT'){
        switch (type){
          case 'checkbox':
            ctrl.disabled=true;
            break;
          case 'radio':
            ctrl.disabled=true;
            break;
          default:
            ctrl.readOnly=true;
        }
      }
      else {
        ctrl.disabled=true;
      }
    }
  }
}
exports.readOnly=readOnly;
function focusFirstElement(form){
  var i=0;
  var len=form.length;
  for (i=0; i < len; i++){
    var ctrl=form[i];
    if (!(ctrl.readOnly || ctrl.disabled)){
      var nodeName=ctrl.nodeName;
      var type=ctrl.getAttribute('type');
      if (type){
        var t=type.toUpperCase();
        if (t === 'SUBMIT'){
          ctrl.focus();
        }
        if (nodeName === 'INPUT'){
          nodeName=t;
        }
      }
      if (nodeName !== 'BUTTON'
        && nodeName !== 'RESET'
        && nodeName !== 'SUBMIT'
        && nodeName !== 'CHECKBOX'
        && nodeName !== 'RADIO'){
        ctrl.focus();
        try {
          ctrl.setSelectionRange(0, ctrl.value.length);
        }
        catch (err){
        }
        return;
      }
    }
  }
}
exports.focusFirstElement=focusFirstElement;
function focusFirstError(form, className){
  var len=form.length;
  if (className && className.length > 0){
    for (var i=0; i < len; i++){
      var ctrl=form[i];
      var parent_1=ctrl.parentElement;
      if (ctrl.classList.contains(className)
        || parent_1.classList.contains(className)){
        ctrl.focus();
        ctrl.scrollIntoView();
        return;
      }
    }
  }
  else {
    for (var i=0; i < len; i++){
      var ctrl=form[i];
      var parent_2=ctrl.parentElement;
      if (ctrl.classList.contains('invalid')
        || ctrl.classList.contains('.ng-invalid')
        || parent_2.classList.contains('invalid')){
        ctrl.focus();
        ctrl.scrollIntoView();
        return;
      }
    }
  }
}
exports.focusFirstError=focusFirstError;
function element(form, childName){
  for (var _i=0, form_3=form; _i < form_3.length; _i++){
    var f=form_3[_i];
    if (f.name === childName){
      return f;
    }
  }
  return null;
}
exports.element=element;
function elements(form, childNames){
  var outputs=[];
  for (var _i=0, form_4=form; _i < form_4.length; _i++){
    var f=form_4[_i];
    for (var _a=0, childNames_1=childNames; _a < childNames_1.length; _a++){
      var child=childNames_1[_a];
      if (child === f.name){
        outputs.push(f);
      }
    }
  }
  return outputs;
}
exports.elements=elements;
function parentByClass(ctrl, className){
  if (!ctrl){
    return null;
  }
  var tmp=ctrl;
  while (true){
    var parent_3=tmp.parentElement;
    if (!parent_3){
      return null;
    }
    if (parent_3.classList.contains(className)){
      return parent_3;
    }
    else {
      tmp=parent_3;
    }
    if (tmp.nodeName === 'BODY'){
      return null;
    }
  }
}
exports.parentByClass=parentByClass;
function getDataFields(form){
  var results=[];
  var attributeValue=form.getAttribute('data-field');
  if (attributeValue && attributeValue.length > 0){
    results.push(form);
  }
  var childNodes=form.childNodes;
  if (childNodes.length > 0){
    for (var _i=0, childNodes_1=childNodes; _i < childNodes_1.length; _i++){
      var childNode=childNodes_1[_i];
      if (childNode.nodeType === Node.ELEMENT_NODE){
        results=results.concat(getDataFields(childNode));
      }
    }
  }
  return results;
}
exports.getDataFields=getDataFields;
