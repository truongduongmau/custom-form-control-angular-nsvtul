import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, Validator, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

@Component({
  selector: 'province-select',
  templateUrl: './province-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProvinceSelect),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProvinceSelect),
      multi: true
    }
  ]
})
export class ProvinceSelect implements ControlValueAccessor, Validator {
  provincesList: { id: number, name: string, type: 'central' | 'province' }[] = [
    { id: 1, name: 'Hà Nội', type: 'central' },
    { id: 2, name: 'TP Hồ Chí Minh', type: 'central' },
    { id: 3, name: 'Đà Nẵng', type: 'central' },
    { id: 4, name: 'Lào Cai', type: 'province' },
    { id: 5, name: 'Yên Bái', type: 'province' },
    { id: 6, name: 'Quảng Bình', type: 'province' },
    { id: 7, name: 'Thái Nguyên', type: 'province' },
    { id: 8, name: 'Daklak', type: 'province' },
    { id: 9, name: 'Nghệ An', type: 'province' },
    { id: 10, name: 'Hà Tĩnh', type: 'province' }
  ];
  private provinceData: { id: number, name: string, type: 'central' | 'province' };
  onChange: (provinceData: any) => void;
  onTouched: () => void;
  isDisabled: boolean;
  @Input('type') type: 'central' | 'province';

  isSelect(provinceId: number): boolean {
    return !this.provinceData ? false : (provinceId === this.provinceData.id);
  }

  writeValue(obj: any) {
    this.provinceData = obj;
  }

  registerOnChange(fn: (provinceData: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  handleOnProvinceChange(e) {
    const provinceId = parseInt(e.target.value);
    const provinceSelect = this.provincesList.find(province => province.id === provinceId);
    this.writeValue(provinceSelect);
    this.onChange(provinceSelect);
  }

  validate(c: FormControl) {
    if (!this.type || !this.provinceData) {
      return null;
    }
    return this.provinceData.type === this.type ? null : {
      type: {
        valid: false,
        actual: c.value
      }
    }
  }
}
