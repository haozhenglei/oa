<template>
  <div class="editor">
    <quill-editor v-model="editorContent" ref="myQuillEditor" :options="editorOption"
                  @change="onEditorChange($event)" @ready="onEditorReady($event)"></quill-editor>
    <el-upload style="display: none" class="avatar-uploader" id="editor-img-upload"
               :action="action" :data="{fileType: 'editorImg'}"
               name="file" accept="image/png,image/gif,image/jpeg,image/bmp,image/x-icon"
               :headers="header" :show-file-list="false"
               :on-success="imageUploadSuccess" :on-error="imageUploadError">
    </el-upload>
    <el-upload style="display: none" class="avatar-uploader" id="editor-video-upload"
               :action="action" :data="{fileType: 'editorVideo'}"
               name="file" accept="video/*"
               :headers="header" :show-file-list="false"
               :on-success="videoUploadSuccess" :on-error="videoUploadError">
    </el-upload>
  </div>
</template>

<script>
  import {quillEditor} from 'vue-quill-editor'
  import baseUrl from '../../assets/js/baseurl'

  export default {
    name: "editor",

    components: {quillEditor},

    props: {
      content: String
    },

    watch: {
      content(val) {
        this.editorContent = val;
      }
    },

    data() {
      return {
        action: baseUrl.dataUrl() + 'fileUpload/upload',
        header: {
          token: localStorage.getItem('adminToken')
        },
        editorContent: '',
        editorOption: {
          placeholder: '请输入',
          theme: 'snow',  // or 'bubble'
          modules: {
            toolbar: {
              container: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],

                [{'header': 1}, {'header': 2}],               // custom button values
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
                [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
                [{'direction': 'rtl'}],                         // text direction

                [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
                [{'header': [1, 2, 3, 4, 5, 6, false]}],

                [{'color': []}, {'background': []}],          // dropdown with defaults from theme
                [{'font': []}],
                [{'align': []}],
                ['link', 'image', 'video'],
                ['clean']                                         // remove formatting button
              ],  // 工具栏
              handlers: {
                'image': function (value) {
                  if (value) {
                    document.querySelector('#editor-img-upload input').click();
                  } else {
                    this.quill.format('image', false);
                  }
                },
                'video': function (value) {
                  if (value) {
                    document.querySelector('#editor-video-upload input').click();
                  } else {
                    this.quill.format('video', false);
                  }
                }
              }
            }
          }
        },
      }
    },
    created() {

    },

    methods: {
      onEditorReady(event) {},

      onEditorChange(event) {
        this.$emit('editor-change', event.html);
      },

      imageUploadSuccess(res, file) {
        let quill = this.$refs.myQuillEditor.quill;
        if (res.code === 200) {
          let length = quill.getSelection().index;
          quill.insertEmbed(length, 'image', res.data);
          quill.setSelection(length + 1);
        } else {
          this.$message.warning('图片插入失败')
        }
      },

      imageUploadError(res, file) {
        this.$message.warning('图片插入失败');
      },

      videoUploadSuccess(res, file) {
        let quill = this.$refs.myQuillEditor.quill;
        if (res.code === 200) {
          let length = quill.getSelection().index;
          quill.insertEmbed(length, 'video', res.data);
          quill.setSelection(length + 1);
        } else {
          this.$message.warning('视频插入失败');
        }
      },

      videoUploadError(res, file) {
        this.$message.warning('视频插入失败');
      }
    }
  }
</script>

<style scoped>

</style>
