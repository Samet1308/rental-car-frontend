import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminServiceService} from "../../services/admin-service.service";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzInputModule} from "ng-zorro-antd/input";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-post-model',
  standalone: true,
  imports: [
    NzSpinModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NgIf
  ],
  templateUrl: './post-model.component.html',
  styleUrls: ['./post-model.component.css']
})
export class PostModelComponent {
  brandId: number = this.activatedroute.snapshot.params['brandId']
  validateForm!: FormGroup
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null
  isSpinning = false

  constructor(
    private message: NzMessageService,
    private adminService: AdminServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]]
    })
  }

  submitForm(): void {
    this.isSpinning = true;
    const formData: FormData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('name', this.validateForm.get('name').value)
    formData.append('description', this.validateForm.get('description').value);
    this.adminService.postModel(this.brandId, formData).subscribe((res) => {
      this.isSpinning = false;
      if (res.id != null) {
        this.message
          .success(
            `Model Başarıyla Eklendi.`, {nzDuration: 5000}
          );
        this.router.navigateByUrl('/admin/dashboard');
      } else {
        this.message.error(
          `Something went wrong`, {nzDuration: 5000})
      }
    });
  }

  onFileSelected (event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
}
