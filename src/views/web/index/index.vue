<template>
  <div class="container">


    <el-row class="hidden-sm-and-up">
      <el-col :span="24" class="left-area">
        <div class="login-wrapper" v-if="!isAuth">
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" v-if="loginForm.operationType == 1">
            <img :src="require('../../../assets/logo/logo.png')" class="logo" />
            <el-form-item prop="email">
              <el-input
                v-model="loginForm.email"
                type="text"
                auto-complete="off"
                placeholder="email"
              >
                <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                auto-complete="off"
                placeholder="password"
              >
                <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
              </el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
              <el-button
                :loading="loading"
                size="medium"
                type="primary"
                style="width:100%;"
                @click.native.prevent="clickLogin"
              >
                <span>Login</span>
              </el-button>
              <div style="float: left;" v-if="true">
                <el-link type="primary" :underline="false" @click="handleRegister">Register</el-link>
              </div>
              <div style="float: right;" v-if="true">
                <el-link type="primary" :underline="false" @click="handleReset">Forget Password ?</el-link>
              </div>
            </el-form-item>
          </el-form>
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" v-if="loginForm.operationType == 2">
            <img :src="require('../../../assets/logo/logo.png')" class="logo" />
            <el-form-item prop="email">
              <el-input
                v-model="loginForm.email"
                type="text"
                auto-complete="off"
                placeholder="email"
              >
                <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
              </el-input>
            </el-form-item>
            <el-form-item prop="password" v-if="registerStep == 2">
              <el-input
                v-model="loginForm.password"
                type="password"
                auto-complete="off"
                placeholder="password"
              >
                <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
              </el-input>
            </el-form-item>
            <el-form-item prop="code" v-if="registerStep == 2">
              <el-input
                v-model="loginForm.code"
                type="text"
                auto-complete="off"
                placeholder="code"
              >
                <svg-icon slot="prefix" icon-class="message" class="el-input__icon input-icon" />
              </el-input>
            </el-form-item>
            <el-form-item style="width:100%;" >
              <el-button
                :loading="loading"
                size="medium"
                type="primary"
                style="width:100%;"
                @click.native.prevent="clickRegister"
              >
                <span v-if="registerStep == 1">Next</span>
                <span v-if="registerStep == 2">Register</span>
              </el-button>
              <div style="float: left;" v-if="true">
                <el-link type="primary" :underline="false" @click="handleLogin">Back</el-link>
              </div>
            </el-form-item>
          </el-form>
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" v-if="loginForm.operationType == 3">
            <img :src="require('../../../assets/logo/logo.png')" class="logo" />
            <el-form-item prop="email">
              <el-input
                v-model="loginForm.email"
                type="text"
                auto-complete="off"
                placeholder="email"
              >
                <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
              </el-input>
            </el-form-item>
            <el-form-item prop="password" v-if="resetStep == 2">
              <el-input
                v-model="loginForm.password"
                type="password"
                auto-complete="off"
                placeholder="password"
              >
                <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
              </el-input>
            </el-form-item>
            <el-form-item prop="code" v-if="resetStep == 2">
              <el-input
                v-model="loginForm.code"
                type="text"
                auto-complete="off"
                placeholder="code"
              >
                <svg-icon slot="prefix" icon-class="message" class="el-input__icon input-icon" />
              </el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
              <el-button
                :loading="loading"
                size="medium"
                type="primary"
                style="width:100%;"
                @click.native.prevent="clickReset"
              >
                <span v-if="resetStep == 1">Next</span>
                <span v-if="resetStep == 2">Reset</span>
              </el-button>
              <div style="float: left;" v-if="true">
                <el-link type="primary" :underline="false" @click="handleLogin">Back</el-link>
              </div>
            </el-form-item>
          </el-form>
          <!--  底部  -->
          <div class="el-login-footer">
            <span>Copyright © 2022-{{new Date().getFullYear()}} root-servers.world All Rights Reserved.</span>
            <el-link class="icp-link" :underline="false" href="https://beian.miit.gov.cn/" target="_blank">豫ICP备2021027560号</el-link>
          </div>
        </div>
        <div class="auth-wrapper" v-if="isAuth">
          <el-row class="header" v-if="!showOperationZone">
            <el-col :span="24">
              <el-form @submit.native.prevent style="display: flex; justify-content: space-around; align-items: center !important;">
                <el-form-item>
                  <el-input @keyup.enter.native="getDomainList" placeholder="Domain Name"  v-model="queryParams.domainName" class="input-with-select">
                    <el-button @click="getDomainList" slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button size="mini" type="primary" @click="clickAddDomain(true)" icon="el-icon-plus" circle></el-button>
                </el-form-item>
                <el-form-item>
                  <el-button size="mini" type="danger" :loading="logoutLoading" @click="clickLogout" icon="el-icon-s-custom" circle></el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <el-row class="header" v-if="showOperationZone">
            <el-col :span="24" class="operation-zone-header" style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap;">
              <el-page-header @back="backOperationDomainName(showMobileAddZoneCode)" title="Back" :content="operationDomainName.domainName" />
              <el-divider></el-divider>
            </el-col>
          </el-row>
          <el-row class="domain-list">
            <div class="empty" v-if="!domainNameList.length">
              <el-empty style="height: 10px" description="Domain name resolution not added"></el-empty>
            </div>
            <div class="content" v-if="domainNameList.length">
              <el-scrollbar class="scrollbar">
                <transition name="el-zoom-in-center">
                  <div class="domain-name-card-wrapper" v-show="!showOperationZone && !showMobileAddZoneCode">
                    <el-card v-for="(domainName, index) in domainNameList">
                      <div slot="header" class="clearfix">
                        <span>{{domainName.domainName}}</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="clickOperationZone(domainName)">Operation</el-button>
                        <span style="float: right;">/</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="clickDeleteDomainName(domainName, true)">Delete</el-button>
                      </div>
                      <el-form>
                        <el-form-item label="DNSSEC:">
                          <el-switch
                            @change="changeDnssec(domainName)"
                            v-model="domainName.dnssecEnable"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                          </el-switch>
                        </el-form-item>
                        <el-form-item label="Digest:" v-if="domainName.dnssecEnable">
                          <span style="word-break: break-all; white-space: normal">{{domainName.dnssecDsDigestValue}}</span>
                        </el-form-item>
                        <el-form-item label="Key Tag:" v-if="domainName.dnssecEnable">
                          <span style="word-break: break-all; white-space: normal">{{domainName.dnssecDsKeyTag}}</span>
                        </el-form-item>
                        <el-form-item label="Digest Type:" v-if="domainName.dnssecEnable">
                          <span style="word-break: break-all; white-space: normal">SHA256(2)</span>
                        </el-form-item>
                        <el-form-item label="Algorithm:" v-if="domainName.dnssecEnable">
                          <span style="word-break: break-all; white-space: normal">ECDSA Curve P-256 with SHA-256(13)</span>
                        </el-form-item>
                      </el-form>
                    </el-card>
                  </div>
                </transition>
                <transition name="el-zoom-in-center">
                  <div class="domain-name-zone-wrapper" v-show="showOperationZone && !showMobileAddZoneCode">
                    <div style="width: 100%;">
                      <el-table empty-text="Not Zone Data" :data="operationDomainNameZoneSimpleList">
                        <el-table-column label="Geo" align="center" prop="geoCode">
                          <template slot-scope="scope">
                            <span>{{ geoMap.get(scope.row.geoCode) }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="Update time" align="center" prop="createTime" width="180">
                          <template slot-scope="scope">
                            <span>{{ parseTime(scope.row.updateTime) }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="Operation" align="center" class-name="small-padding fixed-width">
                          <template slot-scope="scope">
                            <el-button
                              :disabled="currentAddZone != null"
                              v-if="!scope.row.isAdd"
                              size="mini"
                              type="text"
                              @click="handleViewZone(scope.row, true)"
                            >View</el-button>
                            <el-button
                              :disabled="currentAddZone != null"
                              v-if="!scope.row.isAdd"
                              size="mini"
                              type="text"
                              @click="handleEditZone(scope.row, true)"
                            >{{(currentEditZone && (currentEditZone.zoneId == scope.row.zoneId)) ? 'Save' : 'Edit'}}</el-button>
                            <el-button
                              :disabled="currentAddZone != null"
                              v-if="!scope.row.isAdd"
                              size="mini"
                              type="text"
                              @click="handleDeleteZone(scope.row, true)"
                            >Delete</el-button>
                            <el-button
                              v-if="scope.row.isAdd"
                              size="mini"
                              type="text"
                              @click="handleAddZone(scope.row)"
                            >Add</el-button>
                            <el-button
                              v-if="scope.row.isAdd"
                              size="mini"
                              type="text"
                              @click="showMobileAddZoneCode = true"
                            >Modify</el-button>
                            <el-button
                              v-if="scope.row.isAdd"
                              size="mini"
                              type="text"
                              @click="handleCancelAddZone(scope.row)"
                            >Cancel</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                </transition>
                <transition name="el-zoom-in-center">
                  <div class="domain-name-zone-wrapper" v-show="showMobileAddZoneCode">
                    <div style="width: 100%;">
                      <prism-editor
                        class="editor"
                        v-model="zoneFile"
                        aria-disabled
                        :highlight="highlighter"
                        line-numbers
                        :readonly="false"
                        :tabSize="4"
                      ></prism-editor>
                    </div>
                  </div>
                </transition>
              </el-scrollbar>
            </div>
          </el-row>
          <el-row class="page" v-if="!showOperationZone">
            <el-pagination
              @current-change="changePage"
              small
              layout="prev, pager, next"
              :total="domainNameTotal">
            </el-pagination>
          </el-row>
          <el-row class="page" v-if="showOperationZone && !showMobileAddZoneCode">
            <el-link :underline="false" @click="clickAddZone(true)" type="primary">Add Zone</el-link>
          </el-row>
        </div>
      </el-col>
    </el-row>


    <el-row class="hidden-xs-only">
      <el-col :span="8" class="left-area">
        <div class="login-wrapper" v-if="!isAuth">
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" v-if="loginForm.operationType == 1">
            <img :src="require('../../../assets/logo/logo.png')" class="logo" />
            <el-form-item prop="email">
              <el-input
                v-model="loginForm.email"
                type="text"
                auto-complete="off"
                placeholder="email"
              >
                <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                auto-complete="off"
                placeholder="password"
              >
                <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
              </el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
              <el-button
                :loading="loading"
                size="medium"
                type="primary"
                style="width:100%;"
                @click.native.prevent="clickLogin"
              >
                <span>Login</span>
              </el-button>
              <div style="float: left;" v-if="true">
                <el-link type="primary" :underline="false" @click="handleRegister">Register</el-link>
              </div>
              <div style="float: right;" v-if="true">
                <el-link type="primary" :underline="false" @click="handleReset">Forget Password ?</el-link>
              </div>
            </el-form-item>
          </el-form>
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" v-if="loginForm.operationType == 2">
            <img :src="require('../../../assets/logo/logo.png')" class="logo" />
            <el-form-item prop="email">
              <el-input
                v-model="loginForm.email"
                type="text"
                auto-complete="off"
                placeholder="email"
              >
                <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
              </el-input>
            </el-form-item>
            <el-form-item prop="password" v-if="registerStep == 2">
              <el-input
                v-model="loginForm.password"
                type="password"
                auto-complete="off"
                placeholder="password"
              >
                <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
              </el-input>
            </el-form-item>
            <el-form-item prop="code" v-if="registerStep == 2">
              <el-input
                v-model="loginForm.code"
                type="text"
                auto-complete="off"
                placeholder="code"
              >
                <svg-icon slot="prefix" icon-class="message" class="el-input__icon input-icon" />
              </el-input>
            </el-form-item>
            <el-form-item style="width:100%;" >
              <el-button
                :loading="loading"
                size="medium"
                type="primary"
                style="width:100%;"
                @click.native.prevent="clickRegister"
              >
                <span v-if="registerStep == 1">Next</span>
                <span v-if="registerStep == 2">Register</span>
              </el-button>
              <div style="float: left;" v-if="true">
                <el-link type="primary" :underline="false" @click="handleLogin">Back</el-link>
              </div>
            </el-form-item>
          </el-form>
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" v-if="loginForm.operationType == 3">
            <img :src="require('../../../assets/logo/logo.png')" class="logo" />
            <el-form-item prop="email">
              <el-input
                v-model="loginForm.email"
                type="text"
                auto-complete="off"
                placeholder="email"
              >
                <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
              </el-input>
            </el-form-item>
            <el-form-item prop="password" v-if="resetStep == 2">
              <el-input
                v-model="loginForm.password"
                type="password"
                auto-complete="off"
                placeholder="password"
              >
                <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
              </el-input>
            </el-form-item>
            <el-form-item prop="code" v-if="resetStep == 2">
              <el-input
                v-model="loginForm.code"
                type="text"
                auto-complete="off"
                placeholder="code"
              >
                <svg-icon slot="prefix" icon-class="message" class="el-input__icon input-icon" />
              </el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
              <el-button
                :loading="loading"
                size="medium"
                type="primary"
                style="width:100%;"
                @click.native.prevent="clickReset"
              >
                <span v-if="resetStep == 1">Next</span>
                <span v-if="resetStep == 2">Reset</span>
              </el-button>
              <div style="float: left;" v-if="true">
                <el-link type="primary" :underline="false" @click="handleLogin">Back</el-link>
              </div>
            </el-form-item>
          </el-form>
          <!--  底部  -->
          <div class="el-login-footer">
            <span>Copyright © 2022-{{new Date().getFullYear()}} root-servers.world All Rights Reserved.</span>
            <el-link class="icp-link" :underline="false" href="https://beian.miit.gov.cn/" target="_blank">豫ICP备2021027560号</el-link>
          </div>
        </div>
        <div class="auth-wrapper" v-if="isAuth">
          <el-row class="header" v-if="!showOperationZone">
            <el-col :span="24">
              <el-form @submit.native.prevent style="display: flex; justify-content: space-around; align-items: center !important;">
                <el-form-item>
                  <el-input @keyup.enter.native="getDomainList" placeholder="Domain Name"  v-model="queryParams.domainName" class="input-with-select">
                    <el-button @click="getDomainList" slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button size="mini" type="primary" @click="clickAddDomain(false)">Add Domain</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button size="mini" type="danger" :loading="logoutLoading" @click="clickLogout">Logout</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <el-row class="header" v-if="showOperationZone">
            <el-col :span="24" class="operation-zone-header" style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap;">
              <el-page-header @back="backOperationDomainName(false)" title="Back" :content="operationDomainName.domainName" />
              <el-divider></el-divider>
            </el-col>
          </el-row>
          <el-row class="domain-list">
            <div class="empty" v-if="!domainNameList.length">
              <el-empty style="height: 10px" description="Domain name resolution not added"></el-empty>
            </div>
            <div class="content" v-if="domainNameList.length">
              <el-scrollbar class="scrollbar">
                <transition name="el-zoom-in-center">
                  <div class="domain-name-card-wrapper" v-show="!showOperationZone">
                    <el-card v-for="(domainName, index) in domainNameList">
                      <div slot="header" class="clearfix">
                        <span>{{domainName.domainName}}</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="clickOperationZone(domainName)">Operation</el-button>
                        <span style="float: right;">/</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="clickDeleteDomainName(domainName, false)">Delete</el-button>
                      </div>
                      <el-form>
                        <el-form-item label="DNSSEC:">
                          <el-switch
                            @change="changeDnssec(domainName)"
                            v-model="domainName.dnssecEnable"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                          </el-switch>
                        </el-form-item>
                        <el-form-item label="Digest:" v-if="domainName.dnssecEnable">
                          <span style="word-break: break-all; white-space: normal">{{domainName.dnssecDsDigestValue}}</span>
                        </el-form-item>
                        <el-form-item label="Key Tag:" v-if="domainName.dnssecEnable">
                          <span style="word-break: break-all; white-space: normal">{{domainName.dnssecDsKeyTag}}</span>
                        </el-form-item>
                        <el-form-item label="Digest Type:" v-if="domainName.dnssecEnable">
                          <span style="word-break: break-all; white-space: normal">SHA256(2)</span>
                        </el-form-item>
                        <el-form-item label="Algorithm:" v-if="domainName.dnssecEnable">
                          <span style="word-break: break-all; white-space: normal">ECDSA Curve P-256 with SHA-256(13)</span>
                        </el-form-item>
                      </el-form>
                    </el-card>
                  </div>
                </transition>
                <transition name="el-zoom-in-center">
                  <div class="domain-name-zone-wrapper" v-show="showOperationZone">
                    <div style="width: 100%;">
                      <el-table empty-text="Not Zone Data" :data="operationDomainNameZoneSimpleList">
                        <el-table-column label="Geo" align="center" prop="geoCode">
                          <template slot-scope="scope">
                            <span>{{ geoMap.get(scope.row.geoCode) }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="Update time" align="center" prop="createTime" width="180">
                          <template slot-scope="scope">
                            <span>{{ parseTime(scope.row.updateTime) }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="Operation" align="center" class-name="small-padding fixed-width">
                          <template slot-scope="scope">
                            <el-button
                              :disabled="currentAddZone != null"
                              v-if="!scope.row.isAdd"
                              size="mini"
                              type="text"
                              @click="handleViewZone(scope.row, false)"
                            >View</el-button>
                            <el-button
                              :disabled="currentAddZone != null"
                              v-if="!scope.row.isAdd"
                              size="mini"
                              type="text"
                              @click="handleEditZone(scope.row, false)"
                            >{{(currentEditZone && (currentEditZone.zoneId == scope.row.zoneId)) ? 'Save' : 'Edit'}}</el-button>
                            <el-button
                              :disabled="currentAddZone != null"
                              v-if="!scope.row.isAdd"
                              size="mini"
                              type="text"
                              @click="handleDeleteZone(scope.row, false)"
                            >Delete</el-button>
                            <el-button
                              v-if="scope.row.isAdd"
                              size="mini"
                              type="text"
                              @click="handleAddZone(scope.row)"
                            >Add</el-button>
                            <el-button
                              v-if="scope.row.isAdd"
                              size="mini"
                              type="text"
                              @click="handleCancelAddZone(scope.row)"
                            >Cancel</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                </transition>
              </el-scrollbar>
            </div>
          </el-row>
          <el-row class="page" v-if="!showOperationZone">
            <el-pagination
              @current-change="changePage"
              small
              layout="prev, pager, next"
              :total="domainNameTotal">
            </el-pagination>
          </el-row>
          <el-row class="page" v-if="showOperationZone">
            <el-link :underline="false" @click="clickAddZone(false)" type="primary">Add Zone</el-link>
          </el-row>
        </div>
      </el-col>
      <el-col :span="16" class="right-area">
        <el-scrollbar class="scrollbar">
          <prism-editor
            class="editor"
            v-model="zoneFile"
            aria-disabled
            :highlight="highlighter"
            line-numbers
            :readonly="false"
            :tabSize="4"
          ></prism-editor>
        </el-scrollbar>

      </el-col>
    </el-row>


    <!--  添加域名对话框  -->
    <el-dialog
      title="Add Domain Name"
      :visible.sync="showAddDomainName"
      :width="mobile ? '100%' : '30%'">
      <div>
        <el-form label-width="120px" >
          <el-form-item label="Name:">
            <el-input v-model="addDomainNameForm.domainName"></el-input>
          </el-form-item>
          <el-alert
            v-if="showAddDomainNameErrorMsg"
            :title="addDomainNameErrorMsg"
            type="error">
          </el-alert>
          <el-form-item label="Auth Domain:" v-if="showAddDomainNameAuth && addDomainNameAuthInfo.domain">
            <span>{{addDomainNameAuthInfo.domain}}</span>
          </el-form-item>
          <el-form-item label="TXT Content:" v-if="showAddDomainNameAuth && addDomainNameAuthInfo.content">
            <span>{{addDomainNameAuthInfo.content}}</span>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="addDomainNameLoading" @click="submitAddDomainName">Submit</el-button>
      </span>
    </el-dialog>


    <!--  添加域名Zone对话框  -->
    <el-dialog
      title="Add Zone"
      :visible.sync="showAddZone"
      :width="mobile ? '100%' : '30%'">
      <div>
        <el-select v-model="currentAddZoneGeoCode" placeholder="Please select Geo">
          <el-option
            v-for="geo in geoList"
            :key="geo.value"
            :label="geo.label"
            :value="geo.value"
            :disabled="geo.disabled">
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="addDomainNameLoading" @click="confirmSelectZoneGeo">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css';
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";
import { listDomainName, addDomainName, updateDnssec, listDomainNameSimpleZone, listDomainNameZoneGeo, getDomainNameZoneInfo, updateDomainNameZone, deleteDomainNameZone, addDomainNameZone, deleteDomainName } from '@/api/web/domainName'
import { checkRegister, register, checkReset, reset, login, auth, logout } from '@/api/web/login'
import { setWebToken, removeWebToken, getWebToken } from '@/utils/auth'

export default {
  components: {
    PrismEditor
  },
  data () {

    return {
      mobile: true,
      loading: false,
      isAuth: false,
      loginForm: {
        email: '',
        password: '',
        code: '',
        operationType: 1
      },
      loginRules: {
        email: [
          { required: true, trigger: "blur", message: "Please input the email address" }
        ],
        password: [
          { required: true, trigger: "blur", message: "Please input password" }
        ],
        code: [{ required: true, trigger: "change", message: "Please input verification code" }]
      },
      registerStep: 1,
      resetStep: 1,
      logoutLoading: false,
      queryParams: {
        domainName: '',
        pageNum: 1,
        pageSize: 10
      },
      zoneFile: 'root-servers.world.\t0\tIN\tSOA\ta.root-servers.world. info\\@root-servers.world. 0 0 0 0 0\nroot-servers.world.\t0\tIN\tNS\ta.root-servers.world.\nroot-servers.world.\t0\tIN\tNS\tb.root-servers.world.',
      domainNameList: [],
      domainNameTotal: 0,
      showAddDomainName: false,
      addDomainNameForm: {
        domainName: ''
      },
      addDomainNameErrorMsg: '',
      showAddDomainNameErrorMsg: false,
      addDomainNameAuthInfo: {},
      showAddDomainNameAuth: false,
      addDomainNameLoading: false,
      showOperationZone: false,
      showMobileAddZoneCode: false,
      operationDomainName: null,
      operationDomainNameZoneSimpleList: [],
      geoMap: new Map(),
      geoList: [],
      currentEditZone: null,
      currentDeleteZone: null,
      showAddZone: false,
      currentAddZoneGeoCode: '',
      currentAddZone: null
    };
  },
  created() {
    auth().then(res => {
      if (res.code == 401) {
        if (getWebToken()) {
          this.$modal.msgError("Login expired, please login again");
          removeWebToken();
          this.isAuth = false;
        } else {
          this.isAuth = false;
        }
      } else {
        this.isAuth = true;
        this.getGeoInfo();
        this.getDomainList();
      }
    })
  },
  methods: {

    clickDeleteDomainName(domainName, mobile) {
      this.$confirm('Please confirm whether to delete the domain name?', 'warning', {
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
        type: 'warning',
        customClass: mobile ? 'mobile-confirm-style': ''
      }).then(() => {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        deleteDomainName(domainName).then(res => {
          if (res.code == 401) {
            this.$modal.msgError("Login expired, please login again");
            location.reload();
          } else {
            if (res.data.code == 0) {
              this.getDomainList();
              this.$modal.msgSuccess(res.data.message);
            } else {
              this.$modal.msgError(res.data.message);
            }
            this.$forceUpdate();
          }
        }).finally(() => {
          loading.close();
        });
      });
    },

    handleCancelAddZone() {
      this.operationDomainNameZoneSimpleList.splice(0, 1);
      this.currentAddZone = null;
      this.currentAddZoneGeoCode = "";
      this.$forceUpdate();
    },

    handleAddZone(zone) {
      if (this.zoneFile) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        zone.zoneContent = this.zoneFile;
        addDomainNameZone(zone).then(res => {
          if (res.code == 401) {
            this.$modal.msgError("Login expired, please login again");
            location.reload();
          } else {
            if (res.data.code == 0) {
              this.currentAddZone = null;
              this.currentAddZoneGeoCode = "";
              this.getDomainNameSimpleZone(this.operationDomainName);
              this.$modal.msgSuccess(res.data.message);
            } else {
              this.$modal.msgError(res.data.message);
            }
            this.$forceUpdate();
          }
        }).finally(() => {
          loading.close();
        });
      } else {
        this.$modal.msgError("Please input zone file content");
      }
    },

    confirmSelectZoneGeo() {
      if (this.currentAddZoneGeoCode) {
        this.currentAddZone = {};
        this.currentAddZone.isAdd = true;
        this.currentAddZone.geoCode = this.currentAddZoneGeoCode;
        this.currentAddZone.domainId = this.operationDomainName.domainId;
        this.operationDomainNameZoneSimpleList.splice(0, 0, this.currentAddZone);
        this.showAddZone = false;
        if (this.mobile) {
          this.showMobileAddZoneCode = this.mobile;
        }
      } else {
        this.$modal.msgError("Please select Geo");
      }
    },

    clickAddZone(mobile) {
      this.mobile = mobile;
      if (!this.currentAddZone) {
        this.geoList.forEach(geo => {
          geo.disabled = false;
        })
        this.geoList.forEach(geo => {
          this.operationDomainNameZoneSimpleList.forEach(zone => {
            if (zone.geoCode == geo.value) {
              geo.disabled = true;
            } else {
              geo.disabled = false;
            }
          })
        });
        this.showAddZone = true;
      } else {
        this.$modal.msgError("Please save the zone file being added first");
      }
    },

    handleDeleteZone(zone, mobile) {
      this.$confirm('Please confirm whether to delete the zone file?', 'warning', {
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
        type: 'warning',
        customClass: mobile ? 'mobile-confirm-style' : ''
      }).then(() => {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        deleteDomainNameZone(zone).then(res => {
          if (res.code == 401) {
            this.$modal.msgError("Login expired, please login again");
            location.reload();
          } else {
            if (res.data.code == 0) {
              this.getDomainNameSimpleZone(this.operationDomainName);
              this.$modal.msgSuccess(res.data.message);
            } else {
              this.$modal.msgError(res.data.message);
            }
            this.$forceUpdate();
          }
        }).finally(() => {
          loading.close();
        });
      });
    },

    handleEditZone(zone, mobile) {
      if (this.currentEditZone && (this.currentEditZone.zoneId == zone.zoneId)) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        zone.zoneContent = this.zoneFile;
        updateDomainNameZone(zone).then(res => {
          if (res.code == 401) {
            this.$modal.msgError("Login expired, please login again");
            location.reload();
          } else {
            if (res.data.code == 0) {
              this.$modal.msgSuccess(res.data.message);
              this.currentEditZone = null;
            } else {
              this.$modal.msgError(res.data.message);
            }
            this.$forceUpdate();
          }
        }).finally(() => {
          loading.close();
        });
      } else if (this.currentEditZone && (this.currentEditZone.zoneId != zone.zoneId)) {
        this.$modal.msgError("Please save the zone file being edited first");
      } else {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        getDomainNameZoneInfo(zone).then(res => {
          if (res.code == 401) {
            this.$modal.msgError("Login expired, please login again");
            location.reload();
          } else {
            if (res.data.code == 0) {
              this.zoneFile = res.data.zone;
              this.currentEditZone = zone;
              if (mobile) {
                this.showMobileAddZoneCode = true;
              }
            } else {
              this.$modal.msgError(res.data.message);
            }
            this.$forceUpdate();
          }
        }).finally(() => {
          loading.close();
        });
      }
    },

    handleViewZone(zone, mobile) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      getDomainNameZoneInfo(zone).then(res => {
        if (res.code == 401) {
          this.$modal.msgError("Login expired, please login again");
          location.reload();
        } else {
          if (res.data.code == 0) {
            this.zoneFile = res.data.zone;
          } else {
            this.$modal.msgError(res.data.message);
          }
          if (mobile) {
            this.showMobileAddZoneCode = true;
          }
          this.$forceUpdate();
        }
      }).finally(() => {
        loading.close();
      });
    },

    getGeoInfo() {
      listDomainNameZoneGeo().then(res => {
        if (res.code == 401) {
          this.$modal.msgError("Login expired, please login again");
          location.reload();
        } else {
          this.geoList = res.data;
          this.geoList.forEach(geo => {
            this.geoMap.set(geo.value, geo.label);
          })
          this.$forceUpdate();
        }
      });
    },

    getDomainNameSimpleZone(domainName) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      listDomainNameSimpleZone(domainName).then(res => {
        if (res.code == 401) {
          this.$modal.msgError("Login expired, please login again");
          location.reload();
        } else {
          if (res.data.code == 0) {
            this.operationDomainNameZoneSimpleList = res.data.zone;
          } else {
            this.$modal.msgError(res.data.message);
          }
          this.$forceUpdate();
        }
      }).finally(() => {
        loading.close();
      });
    },

    clickOperationZone(domainName) {
      this.operationDomainName = domainName;
      this.showOperationZone = true;
      this.getDomainNameSimpleZone(domainName);
    },

    backOperationDomainName(mobile) {
      if (mobile) {
        this.showOperationZone = true;
        this.showMobileAddZoneCode = false;
      } else {
        this.showOperationZone = false;
        this.currentAddZone = null;
      }
    },

    changeDnssec(domainName) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      updateDnssec(domainName).then(res => {
        if (res.code == 401) {
          this.$modal.msgError("Login expired, please login again");
          location.reload();
        } else {
          if (res.data.code == 0) {
            domainName.updateTime = res.data.dnssec.updateTime;
            domainName.dnssecDsKeyTag = res.data.dnssec.dnssecDsKeyTag;
            domainName.dnssecDsDigestValue = res.data.dnssec.dnssecDsDigestValue;
            this.$modal.msgSuccess(res.data.message);
          } else {
            domainName.dnssecEnable = !domainName.dnssecEnable;
            this.$modal.msgError(res.data.message);
          }
          this.$forceUpdate();
        }
      }).finally(() => {
        loading.close();
      });
    },

    submitAddDomainName() {
      this.showAddDomainNameErrorMsg = false;
      if (this.addDomainNameForm.domainName) {
        this.addDomainNameLoading = true;
        addDomainName(this.addDomainNameForm).then(res => {
          if (res.code == 401) {
            this.$modal.msgError("Login expired, please login again");
            location.reload();
          } else {
            if (res.data.code == 0) {
              this.addDomainNameForm.domainName = '';
              this.addDomainNameErrorMsg = "";
              this.showAddDomainNameErrorMsg = false;
              this.addDomainNameAuthInfo = {};
              this.showAddDomainNameAuth = false;
              this.showAddDomainName = false;
              this.$modal.msgSuccess(res.data.message);
              this.getDomainList();
            } else {
              this.addDomainNameAuthInfo = res.data;
              this.addDomainNameErrorMsg = res.data.message;
              this.showAddDomainNameErrorMsg = true;
              this.showAddDomainNameAuth = true;
            }
          }
        }).finally(() => {
          this.addDomainNameLoading = false;
        });
      } else {
        this.addDomainNameErrorMsg = "Please input a domain name";
        this.showAddDomainNameErrorMsg = true;
      }
    },

    clickAddDomain(mobile) {
      this.mobile = mobile;
      console.log(this.mobile)
      this.showAddDomainName = true;
    },

    clickLogout() {
      this.logoutLoading = true;
      this.$modal.msgSuccess("Logout success!")
      logout();
      removeWebToken();
      location.reload();
    },

    changePage(currentPage) {
      this.queryParams.pageNum = currentPage;
      this.getDomainList();
    },
    getDomainList() {
      listDomainName(this.queryParams).then(res => {
        if (res.code == 401) {
          this.$modal.msgError("Login expired, please login again");
          location.reload();
        } else {
          this.domainNameTotal = res.total;
          this.domainNameList = res.rows;
        }
      });
    },

    clickLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          login(this.loginForm).then(res => {
            if (res.data.code == 0) {
              setWebToken(res.data.token)
              this.isAuth = true;
              this.getGeoInfo();
              this.getDomainList();
              this.$modal.msgSuccess(res.data.message);
            } else {
              this.$modal.msgError(res.data.message);
            }
          }).finally(() => {
            this.loading = false;
          });
        }
      });
    },

    clickReset() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.resetStep == 1) {
            checkReset(this.loginForm).then(res => {
              if (res.data.code == 0) {
                this.resetStep = 2;
                this.$modal.msgSuccess(res.data.message);
              } else {
                this.$modal.msgError(res.data.message);
              }
            }).finally(() => {
              this.loading = false;
            });
          } else {
            reset(this.loginForm).then(res => {
              if (res.data.code == 0) {
                this.loginForm.operationType = 1;
                this.resetStep = 1;
                this.$modal.msgSuccess(res.data.message);
              } else {
                this.$modal.msgError(res.data.message);
              }
            }).finally(() => {
              this.loading = false;
            });
          }
        }
      });
    },

    clickRegister() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.registerStep == 1) {
            checkRegister(this.loginForm).then(res => {
              if (res.data.code == 0) {
                this.registerStep = 2;
                this.$modal.msgSuccess(res.data.message);
              } else {
                this.$modal.msgError(res.data.message);
              }
            }).finally(() => {
              this.loading = false;
            });
          } else {
            register(this.loginForm).then(res => {
              if (res.data.code == 0) {
                this.loginForm.operationType = 1;
                this.registerStep = 1;
                this.$modal.msgSuccess(res.data.message);
              } else {
                this.$modal.msgError(res.data.message);
              }
            }).finally(() => {
              this.loading = false;
            });
          }
        }
      });
    },

    handleLogin() {
      this.loginForm.operationType = 1;
      this.registerStep = 1;
      this.resetStep = 1;
    },

    handleReset() {
      this.resetStep = 1;
      this.loginForm.operationType = 3;
    },

    handleRegister() {
      this.registerStep = 1;
      this.loginForm.operationType = 2;
    },
    highlighter(code) {
      return highlight(code, languages.js); //returns html
    }
  }
}
</script>

<style>
.mobile-confirm-style{
  width: 320px !important;
}
</style>

<style lang="scss" scoped>



.container{
  width: 100vw;
  height: 100vh;
  .left-area{
    height: 100vh;
    .login-wrapper{
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      .login-form {
        border-radius: 6px;
        background: #ffffff;
        width: 400px;
        padding: 25px 25px 5px 25px;
        .logo{
          width: 100%;
          height: auto;
          transform: scale(0.6);
        }
        .el-input {
          height: 38px;
          input {
            height: 38px;
          }
        }
        .input-icon {
          height: 39px;
          width: 14px;
          margin-left: 2px;
        }
      }
      .el-login-footer {
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        overflow: hidden;
        position: absolute;
        bottom: 0;
        text-align: center;
        color: #707070;
        font-family: Arial;
        font-size: 12px;
        letter-spacing: 1px;
        .icp-link {
          font-size: 12px;
        }
        .icp-link :hover {
          color: #707070;
        }
      }
    }
    .auth-wrapper{
      width: 100%;
      height: 100vh;
      .header{
        width: 100%;
        height: 10vh;
        padding-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        .operation-zone-header{
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          padding-top: 20px;
        }
      }
      .domain-list{
        width: 100%;
        height: 85vh;
        .empty{
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .content{
          height: 100%;
          .scrollbar{
            height: 100%;
            ::v-deep .el-scrollbar__wrap{
              overflow-x: hidden;
            }
            .domain-name-card-wrapper{
              width: 100%;
            }
            .domain-name-zone-wrapper{
              width: 100%;
              display: flex;
              justify-content: center;
              flex-wrap: wrap;
              .editor {
                background-color: rgba(51, 51, 51, 0.9);
                color: #ccc;
                font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
                font-size: 14px;
                line-height: 1.5;
                min-height: 100vh;
                padding-top: 20px;
                padding-bottom: 20px;
                ::v-deep .prism-editor__textarea{
                  outline: none !important;
                }
                overflow-x: hidden;
              }
            }
          }
        }
      }
      .page{
        width: 100%;
        height: 5vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .right-area{
    height: 100vh;
    .scrollbar{
      height: 100%;
      ::v-deep .el-scrollbar__wrap{
        overflow-x: hidden;
      }
      .editor {
        background-color: rgba(51, 51, 51, 0.9);
        color: #ccc;
        font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
        font-size: 14px;
        line-height: 1.5;
        min-height: 100vh;
        padding-top: 20px;
        padding-bottom: 20px;
        ::v-deep .prism-editor__textarea{
          outline: none !important;
        }
        overflow-x: hidden;
      }
    }
  }
}


</style>
