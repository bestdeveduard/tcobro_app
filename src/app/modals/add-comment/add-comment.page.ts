import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/commonService';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.page.html',
  styleUrls: ['./add-comment.page.scss'],
})
export class AddCommentPage implements OnInit {

  form: FormGroup
  loan_id

  constructor(
    private api: ApiService,
    public comService: CommonService,
    private modalCtrl: ModalController,
    private navParam: NavParams
  ) { 
    this.form = new FormGroup({
      comment: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      })
    });
    this.loan_id = navParam.get('loan_id')
  }

  ngOnInit() {
  }

  async submitForm() {
    await this.comService.presentLoading();
    this.api.requestPostData('addCommentData', {notes: this.form.value.comment, user_id: this.comService.currentUser.id, loan_id: this.loan_id}).subscribe(result => {
      this.comService.hideLoading();
      this.comService.presentToast(result.message);
      this.modalCtrl.dismiss('', 'added');
    }, error => {
      this.comService.hideLoading();
      console.log('error == ', error);
    })
    
  }

  cancel() {
    this.modalCtrl.dismiss()
  }

}
