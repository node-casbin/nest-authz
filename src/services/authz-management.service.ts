import { Injectable, Inject } from '@nestjs/common';
import { AUTHZ_ENFORCER } from '../authz.constants';
import * as casbin from 'casbin';

/**
 * A wrapper of casbin management API
 */
@Injectable()
export class AuthZManagementService {
  constructor(
    @Inject(AUTHZ_ENFORCER)
    private readonly enforcer: casbin.Enforcer
  ) {}

  /**
   * getAllSubjects gets the list of subjects that show up in the current policy.
   *
   * @return all the subjects in "p" policy rules. It actually collects the
   *         0-index elements of "p" policy rules. So make sure your subject
   *         is the 0-index element, like (sub, obj, act). Duplicates are removed.
   */
  getAllSubjects(): string[] {
    return this.enforcer.getAllSubjects();
  }
  /**
   * getAllNamedSubjects gets the list of subjects that show up in the currentnamed policy.
   *
   * @param ptype the policy type, can be "p", "p2", "p3", ..
   * @return all the subjects in policy rules of the ptype type. It actually
   *         collects the 0-index elements of the policy rules. So make sure
   *         your subject is the 0-index element, like (sub, obj, act).
   *         Duplicates are removed.
   */
  getAllNamedSubjects(ptype: string): string[] {
    return this.enforcer.getAllNamedSubjects(ptype);
  }
  /**
   * getAllObjects gets the list of objects that show up in the current policy.
   *
   * @return all the objects in "p" policy rules. It actually collects the
   *         1-index elements of "p" policy rules. So make sure your object
   *         is the 1-index element, like (sub, obj, act).
   *         Duplicates are removed.
   */
  getAllObjects(): string[] {
    return this.enforcer.getAllObjects();
  }
  /**
   * getAllNamedObjects gets the list of objects that show up in the current named policy.
   *
   * @param ptype the policy type, can be "p", "p2", "p3", ..
   * @return all the objects in policy rules of the ptype type. It actually
   *         collects the 1-index elements of the policy rules. So make sure
   *         your object is the 1-index element, like (sub, obj, act).
   *         Duplicates are removed.
   */
  getAllNamedObjects(ptype: string): string[] {
    return this.enforcer.getAllNamedObjects(ptype);
  }
  /**
   * getAllActions gets the list of actions that show up in the current policy.
   *
   * @return all the actions in "p" policy rules. It actually collects
   *         the 2-index elements of "p" policy rules. So make sure your action
   *         is the 2-index element, like (sub, obj, act).
   *         Duplicates are removed.
   */
  getAllActions(): string[] {
    return this.enforcer.getAllActions();
  }
  /**
   * GetAllNamedActions gets the list of actions that show up in the current named policy.
   *
   * @param ptype the policy type, can be "p", "p2", "p3", ..
   * @return all the actions in policy rules of the ptype type. It actually
   *         collects the 2-index elements of the policy rules. So make sure
   *         your action is the 2-index element, like (sub, obj, act).
   *         Duplicates are removed.
   */
  getAllNamedActions(ptype: string): string[] {
    return this.enforcer.getAllNamedActions(ptype);
  }
  /**
   * getAllRoles gets the list of roles that show up in the current policy.
   *
   * @return all the roles in "g" policy rules. It actually collects
   *         the 1-index elements of "g" policy rules. So make sure your
   *         role is the 1-index element, like (sub, role).
   *         Duplicates are removed.
   */
  getAllRoles(): string[] {
    return this.enforcer.getAllRoles();
  }
  /**
   * getAllNamedRoles gets the list of roles that show up in the current named policy.
   *
   * @param ptype the policy type, can be "g", "g2", "g3", ..
   * @return all the subjects in policy rules of the ptype type. It actually
   *         collects the 0-index elements of the policy rules. So make
   *         sure your subject is the 0-index element, like (sub, obj, act).
   *         Duplicates are removed.
   */
  getAllNamedRoles(ptype: string): string[] {
    return this.enforcer.getAllNamedRoles(ptype);
  }
  /**
   * getPolicy gets all the authorization rules in the policy.
   *
   * @return all the "p" policy rules.
   */
  getPolicy(): string[][] {
    return this.enforcer.getPolicy();
  }
  /**
   * getFilteredPolicy gets all the authorization rules in the policy, field filters can be specified.
   *
   * @param fieldIndex the policy rule's start index to be matched.
   * @param fieldValues the field values to be matched, value ""
   *                    means not to match this field.
   * @return the filtered "p" policy rules.
   */
  getFilteredPolicy(fieldIndex: number, ...fieldValues: string[]): string[][] {
    return this.enforcer.getFilteredPolicy(fieldIndex, ...fieldValues);
  }
  /**
   * getNamedPolicy gets all the authorization rules in the named policy.
   *
   * @param ptype the policy type, can be "p", "p2", "p3", ..
   * @return the "p" policy rules of the specified ptype.
   */
  getNamedPolicy(ptype: string): string[][] {
    return this.enforcer.getNamedPolicy(ptype);
  }
  /**
   * getFilteredNamedPolicy gets all the authorization rules in the named policy, field filters can be specified.
   *
   * @param ptype the policy type, can be "p", "p2", "p3", ..
   * @param fieldIndex the policy rule's start index to be matched.
   * @param fieldValues the field values to be matched, value ""
   *                    means not to match this field.
   * @return the filtered "p" policy rules of the specified ptype.
   */
  getFilteredNamedPolicy(
    ptype: string,
    fieldIndex: number,
    ...fieldValues: string[]
  ): string[][] {
    return this.enforcer.getFilteredNamedPolicy(
      ptype,
      fieldIndex,
      ...fieldValues
    );
  }
  /**
   * getGroupingPolicy gets all the role inheritance rules in the policy.
   *
   * @return all the "g" policy rules.
   */
  getGroupingPolicy(): string[][] {
    return this.enforcer.getGroupingPolicy();
  }
  /**
   * getFilteredGroupingPolicy gets all the role inheritance rules in the policy, field filters can be specified.
   *
   * @param fieldIndex the policy rule's start index to be matched.
   * @param fieldValues the field values to be matched, value "" means not to match this field.
   * @return the filtered "g" policy rules.
   */
  getFilteredGroupingPolicy(
    fieldIndex: number,
    ...fieldValues: string[]
  ): string[][] {
    return this.enforcer.getFilteredGroupingPolicy(fieldIndex, ...fieldValues);
  }
  /**
   * getNamedGroupingPolicy gets all the role inheritance rules in the policy.
   *
   * @param ptype the policy type, can be "g", "g2", "g3", ..
   * @return the "g" policy rules of the specified ptype.
   */
  getNamedGroupingPolicy(ptype: string): string[][] {
    return this.enforcer.getNamedGroupingPolicy(ptype);
  }
  /**
   * getFilteredNamedGroupingPolicy gets all the role inheritance rules in the policy, field filters can be specified.
   *
   * @param ptype the policy type, can be "g", "g2", "g3", ..
   * @param fieldIndex the policy rule's start index to be matched.
   * @param fieldValues the field values to be matched, value ""
   *                    means not to match this field.
   * @return the filtered "g" policy rules of the specified ptype.
   */
  getFilteredNamedGroupingPolicy(
    ptype: string,
    fieldIndex: number,
    ...fieldValues: string[]
  ): string[][] {
    return this.enforcer.getFilteredNamedGroupingPolicy(
      ptype,
      fieldIndex,
      ...fieldValues
    );
  }
  /**
   * hasPolicy determines whether an authorization rule exists.
   *
   * @param params the "p" policy rule, ptype "p" is implicitly used.
   * @return whether the rule exists.
   */
  hasPolicy(...params: string[]): boolean {
    return this.enforcer.hasPolicy(...params);
  }
  /**
   * hasNamedPolicy determines whether a named authorization rule exists.
   *
   * @param ptype the policy type, can be "p", "p2", "p3", ..
   * @param params the "p" policy rule.
   * @return whether the rule exists.
   */
  hasNamedPolicy(ptype: string, ...params: string[]): boolean {
    return this.enforcer.hasNamedPolicy(ptype, ...params);
  }
  /**
   * addPolicy adds an authorization rule to the current policy.
   * If the rule already exists, the function returns false and the rule will not be added.
   * Otherwise the function returns true by adding the new rule.
   *
   * @param params the "p" policy rule, ptype "p" is implicitly used.
   * @return succeeds or not.
   */
  addPolicy(...params: string[]): Promise<boolean> {
    return this.enforcer.addPolicy(...params);
  }
  /**
   * addNamedPolicy adds an authorization rule to the current named policy.
   * If the rule already exists, the function returns false and the rule will not be added.
   * Otherwise the function returns true by adding the new rule.
   *
   * @param ptype the policy type, can be "p", "p2", "p3", ..
   * @param params the "p" policy rule.
   * @return succeeds or not.
   */
  addNamedPolicy(ptype: string, ...params: string[]): Promise<boolean> {
    return this.enforcer.addNamedPolicy(ptype, ...params);
  }
  /**
   * removePolicy removes an authorization rule from the current policy.
   *
   * @param params the "p" policy rule, ptype "p" is implicitly used.
   * @return succeeds or not.
   */
  removePolicy(...params: string[]): Promise<boolean> {
    return this.enforcer.removePolicy(...params);
  }
  /**
   * removeFilteredPolicy removes an authorization rule from the current policy, field filters can be specified.
   *
   * @param fieldIndex the policy rule's start index to be matched.
   * @param fieldValues the field values to be matched, value ""
   *                    means not to match this field.
   * @return succeeds or not.
   */
  removeFilteredPolicy(
    fieldIndex: number,
    ...fieldValues: string[]
  ): Promise<boolean> {
    return this.enforcer.removeFilteredPolicy(fieldIndex, ...fieldValues);
  }
  /**
   * removeNamedPolicy removes an authorization rule from the current named policy.
   *
   * @param ptype the policy type, can be "p", "p2", "p3", ..
   * @param params the "p" policy rule.
   * @return succeeds or not.
   */
  removeNamedPolicy(ptype: string, ...params: string[]): Promise<boolean> {
    return this.enforcer.removeNamedPolicy(ptype, ...params);
  }
  /**
   * removeFilteredNamedPolicy removes an authorization rule from the current named policy, field filters can be specified.
   *
   * @param ptype the policy type, can be "p", "p2", "p3", ..
   * @param fieldIndex the policy rule's start index to be matched.
   * @param fieldValues the field values to be matched, value ""
   *                    means not to match this field.
   * @return succeeds or not.
   */
  removeFilteredNamedPolicy(
    ptype: string,
    fieldIndex: number,
    ...fieldValues: string[]
  ): Promise<boolean> {
    return this.enforcer.removeFilteredNamedPolicy(
      ptype,
      fieldIndex,
      ...fieldValues
    );
  }
  /**
   * hasGroupingPolicy determines whether a role inheritance rule exists.
   *
   * @param params the "g" policy rule, ptype "g" is implicitly used.
   * @return whether the rule exists.
   */
  hasGroupingPolicy(...params: string[]): boolean {
    return this.enforcer.hasGroupingPolicy(...params);
  }
  /**
   * hasNamedGroupingPolicy determines whether a named role inheritance rule exists.
   *
   * @param ptype the policy type, can be "g", "g2", "g3", ..
   * @param params the "g" policy rule.
   * @return whether the rule exists.
   */
  hasNamedGroupingPolicy(ptype: string, ...params: string[]): boolean {
    return this.enforcer.hasNamedGroupingPolicy(ptype, ...params);
  }
  /**
   * addGroupingPolicy adds a role inheritance rule to the current policy.
   * If the rule already exists, the function returns false and the rule will not be added.
   * Otherwise the function returns true by adding the new rule.
   *
   * @param params the "g" policy rule, ptype "g" is implicitly used.
   * @return succeeds or not.
   */
  addGroupingPolicy(...params: string[]): Promise<boolean> {
    return this.enforcer.addGroupingPolicy(...params);
  }
  /**
   * addNamedGroupingPolicy adds a named role inheritance rule to the current policy.
   * If the rule already exists, the function returns false and the rule will not be added.
   * Otherwise the function returns true by adding the new rule.
   *
   * @param ptype the policy type, can be "g", "g2", "g3", ..
   * @param params the "g" policy rule.
   * @return succeeds or not.
   */
  addNamedGroupingPolicy(ptype: string, ...params: string[]): Promise<boolean> {
    return this.enforcer.addNamedGroupingPolicy(ptype, ...params);
  }
  /**
   * removeGroupingPolicy removes a role inheritance rule from the current policy.
   *
   * @param params the "g" policy rule, ptype "g" is implicitly used.
   * @return succeeds or not.
   */
  removeGroupingPolicy(...params: string[]): Promise<boolean> {
    return this.enforcer.removeGroupingPolicy(...params);
  }
  /**
   * removeFilteredGroupingPolicy removes a role inheritance rule from the current policy, field filters can be specified.
   *
   * @param fieldIndex the policy rule's start index to be matched.
   * @param fieldValues the field values to be matched, value ""
   *                    means not to match this field.
   * @return succeeds or not.
   */
  removeFilteredGroupingPolicy(
    fieldIndex: number,
    ...fieldValues: string[]
  ): Promise<boolean> {
    return this.enforcer.removeFilteredGroupingPolicy(
      fieldIndex,
      ...fieldValues
    );
  }
  /**
   * removeNamedGroupingPolicy removes a role inheritance rule from the current named policy.
   *
   * @param ptype the policy type, can be "g", "g2", "g3", ..
   * @param params the "g" policy rule.
   * @return succeeds or not.
   */
  removeNamedGroupingPolicy(
    ptype: string,
    ...params: string[]
  ): Promise<boolean> {
    return this.enforcer.removeNamedGroupingPolicy(ptype, ...params);
  }
  /**
   * removeFilteredNamedGroupingPolicy removes a role inheritance rule from the current named policy, field filters can be specified.
   *
   * @param ptype the policy type, can be "g", "g2", "g3", ..
   * @param fieldIndex the policy rule's start index to be matched.
   * @param fieldValues the field values to be matched, value ""
   *                    means not to match this field.
   * @return succeeds or not.
   */
  removeFilteredNamedGroupingPolicy(
    ptype: string,
    fieldIndex: number,
    ...fieldValues: string[]
  ): Promise<boolean> {
    return this.enforcer.removeFilteredNamedGroupingPolicy(
      ptype,
      fieldIndex,
      ...fieldValues
    );
  }
  /**
   * addFunction adds a customized function.
   * @param name custom function name
   * @param func function
   */
  addFunction(name: string, func: any): void {
    return this.enforcer.addFunction(name, func);
  }
}
