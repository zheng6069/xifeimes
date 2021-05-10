<template>
    <div>
        <el-dialog :visible.sync="personnelPop" @close="closeDialog" width="30%">
            <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="刷卡" name="first">
                    <div class="imgCon"></div>
                    <el-form
                        :label-position="labelPosition"
                        label-width="80px"
                        :model="formLabelCard"
                    >
                        <el-form-item label class="transparent">
                            <el-input
                                v-model="formLabelCard.num"
                                ref="idCard"
                                @change="handleInput"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="刷卡卡号" v-show="false">
                            <el-input style="width:220px;"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="手输" name="second">
                    <el-form
                        :label-position="labelPosition"
                        label-width="80px"
                        :model="formLabelAlign"
                        ref="formLabelAlign"
                        :rules="rules"
                    >
                        <el-form-item label="人员编号" prop="name">
                            <el-input
                                v-model="formLabelAlign.name"
                                placeholder="请输入"
                                clearable
                                style="width:220px;"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="人员名称" prop="region">
                            <el-input
                                v-model="formLabelAlign.region"
                                placeholder="请输入"
                                clearable
                                style="width:220px;"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <div slot="footer" class="dialog-footer" v-show="vShow">
                <el-button @click="personnelPop = false">取 消</el-button>
                <el-button type="primary" @click="personnelPopSava()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
// ============================================= 这是子组件
export default {
    name: "my-personnel",
    props: ["personnelPopTrue"],
    data() {
        return {
            activeName: "first",
            labelPosition: "right",
            personnelPop: false,
            formLabelAlign: {
                name: "",
                region: ""
            },
            formLabelCard: {
                num: ""
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入人员编号",
                        trigger: "blur"
                    },
                    {
                        pattern: /^[0-9]*$/,
                        message: "只可以输入数字",
                        trigger: "blur"
                    }
                ],
                region: [
                    {
                        required: true,
                        message: "请输入人员名称",
                        trigger: "blur"
                    }
                ]
            },
            vShow: false
        };
    },
    watch: {
        personnelPopTrue(newName) {
            this.personnelPop = newName;
            this.$nextTick(() => {
                this.$refs.idCard.focus();
            });
        }
    },
    created() {},
    mounted() {},
    computed: {},
    methods: {
        handleClick(tab) {
            if (tab.name == "second") {
                this.vShow = true;
            } else if (tab.name == "first") {
                this.vShow = false;
                this.$nextTick(() => {
                    this.$refs.idCard.focus();
                });
            }
        },
        closeDialog() {
            this.$emit("closeDialog", this.formLabelAlign, this.formLabelCard);
        },
        //子组件校验，传递到父组件
        validateForm() {
            let flag = null;
            this.$refs["formLabelAlign"].validate(valid => {
                if (valid) {
                    flag = true;
                } else {
                    flag = false;
                }
            });
            return flag;
        },
        // 确定按钮
        personnelPopSava() {
            this.$emit("personnelPopSava", this.formLabelAlign);
        },
        // 自动触发
        handleInput() {
            this.$emit("handleInput", this.formLabelCard);
        }
    }
};
</script>
<style>
.imgCon {
    width: 260px;
    height: 200px;
    margin: auto;
    background: url("../assets/icon.png") no-repeat;
}
.transparent .el-input {
    width: 20px;
    height: 10px;
}
.transparent .el-input .el-input__inner {
    width: 20px;
    height: 10px;
    background: transparent;
    border: none;
    color: #fff;
}
</style>
